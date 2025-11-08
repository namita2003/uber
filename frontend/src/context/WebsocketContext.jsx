import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { jwtDecode } from "jwt-decode";


export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const wsRef = useRef(null);
    const handlersRef = useRef(new Map()); // eventName -> Set of handlers
    const reconnectAttempts = useRef(0);
    const [connected, setConnected] = useState(false);

    const isDevTunnel = window.location.hostname.includes("devtunnels.ms");

    const WS_URL = import.meta.env.VITE_WS_URL
        ? import.meta.env.VITE_WS_URL
        : isDevTunnel
            ? `wss://${window.location.hostname}` // no port for dev tunnel
            : window.location.protocol === "https:"
                ? `wss://${window.location.hostname}:4000`
                : `ws://${window.location.hostname}:4000`;


    const connect = useCallback(() => {
        if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
            return;
        }

        const ws = new WebSocket(WS_URL);
        wsRef.current = ws;

        // ✅ Connected
        ws.onopen = () => {
            reconnectAttempts.current = 0;
            setConnected(true);
            console.log('🟢 WebSocket connected:', WS_URL);
        };

        // ✅ Incoming message
        ws.onmessage = (evt) => {
            try {
                console.log("💬 WS message received (raw):", evt.data);

                const msg = JSON.parse(evt.data);
                const event = msg.event || msg.type || "unknown";
                const data = msg.data !== undefined ? msg.data : { ...msg };

                console.log("🔍 Parsed WS message:", { event, data });

                // --- 👇 AUTO REGISTER CAPTAIN or USER SOCKET (via JWT decode) ---
                if (event === "init" && data?.socketId) {
                    const wsSocketId = data.socketId;
                    console.log("🧠 New WebSocket initialized:", wsSocketId);

                    // --- CAPTAIN ---
                    const captainToken = localStorage.getItem("captaintoken");
                    if (captainToken) {
                        try {
                            const decoded = jwtDecode(captainToken);
                            const captainId = decoded._id || decoded.id || decoded.captainId;
                            if (captainId) {
                                console.log("🚗 Auto-registering captain socket:", captainId);
                                ws.send(
                                    JSON.stringify({
                                        type: 'register',
                                        userId: captainId,
                                        role: 'captain',
                                        
                                    })
                                );
                            }
                        } catch (err) {
                            console.error("❌ Captain JWT decode failed:", err.message);
                        }
                    }

                    // --- USER ---
                    const userToken = localStorage.getItem("token");
                    if (userToken) {
                        try {
                            const decoded = jwtDecode(userToken);
                            const userId = decoded._id || decoded.id || decoded.userId;
                            if (userId) {
                                console.log("🧍 Auto-registering user socket:", userId);
                                ws.send(
                                    JSON.stringify({
                                        type: "register",
                                        role: "user",
                                        userId: userId,
                                    })
                                );
                            }
                        } catch (err) {
                            console.error("❌ User JWT decode failed:", err.message);
                        }
                    }

                    if (!captainToken && !userToken) {
                        console.warn("⚠️ No userToken or captainToken found in localStorage");
                    }
                }



                // Dispatch to subscribers for this specific event
                const handlers = handlersRef.current.get(event);
                if (handlers) {
                    handlers.forEach((h) => {
                        try {
                            h(data);
                        } catch (err) {
                            console.error("WS handler error:", err);
                        }
                    });
                }

                // Dispatch to "*" subscribers (debug/all events)
                const allHandlers = handlersRef.current.get("*");
                if (allHandlers) {
                    allHandlers.forEach((h) => {
                        try {
                            h({ event, data });
                        } catch (err) {
                            console.error("WS * handler error:", err);
                        }
                    });
                }
            } catch (err) {
                console.warn("Invalid WS message:", err);
            }
        };



        // ✅ Closed connection
        ws.onclose = (e) => {
            setConnected(false);
            console.log('🔴 WebSocket closed:', e?.code, e?.reason);

            // Prevent reconnect spam if user is navigating away or unmounting
            if (document.visibilityState === 'hidden' || e?.code === 1000) {
                console.log('⏹️ Skipping reconnect: intentional close or page hidden');
                return;
            }

            // Reconnect logic
            const timeout = Math.min(10000, 1000 * 2 ** reconnectAttempts.current);
            reconnectAttempts.current += 1;
            console.log(`🔁 Reconnecting in ${timeout}ms...`);
            setTimeout(() => {
                if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
                    connect();
                }
            }, timeout);
        };

        // ✅ Error
        ws.onerror = (err) => {
            console.error('❌ WebSocket error:', err);
        };
    }, [WS_URL]);

    // ✅ Connect when component mounts
    useEffect(() => {
        connect();
        return () => {
            try {
                wsRef.current?.close(1000, 'Component unmounted');
                console.log('🛑 WebSocket closed intentionally (unmount)');
            } catch (e) { /* ignore */ }
        };
    }, [connect]);

    // ✅ Send message to server
    const sendEvent = useCallback((event, data = {}) => {
        const ws = wsRef.current;
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            console.warn('⚠️ WebSocket not open, failed to send event:', event);
            return false;
        }
        try {
            ws.send(JSON.stringify({ event, data }));
            console.log('📤 WS message sent:', { event, data });
            return true;
        } catch (err) {
            console.error('💥 Failed to send WS message', err);
            return false;
        }
    }, []);

    // ✅ Subscribe to an event
    const subscribe = useCallback((event, handler) => {
        if (!handlersRef.current.has(event)) handlersRef.current.set(event, new Set());
        handlersRef.current.get(event).add(handler);
        console.log('✅ Subscribed to WS event:', event);

        return () => {
            const set = handlersRef.current.get(event);
            if (!set) return;
            set.delete(handler);
            if (set.size === 0) handlersRef.current.delete(event);
            console.log('🚫 Unsubscribed from WS event:', event);
        };
    }, []);

    const contextValue = {
        connected,
        sendEvent,
        subscribe,
        rawSocket: wsRef.current
    };

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    );
};

// ✅ Custom hook
export const useWebSocket = () => React.useContext(WebSocketContext);
