const WebSocket = require('ws');
const { randomUUID } = require('crypto');
const userModel = require('./models/userModels');
const captainModel = require('./models/captainModel');

let wss;
const clients = new Map();

function initializeSocket(server) {
    wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        const id = randomUUID();
        ws.id = id;
        clients.set(id, ws);

        console.log('✅ WebSocket connected:', id);

        // Tell client its socket ID
        safeSend(ws, { type: 'init', socketId: id });

        // Handle messages
        ws.on('message', async (message) => {
            try {
                const data = JSON.parse(message.toString());
                console.log(`📩 Message from ${id}:`, data);

                // 🔹 REGISTER EVENT
                if (data.type === 'register' && data.role && data.userId) {
                    const { role, userId } = data;

                    try {
                        if (role === 'user') {
                            await userModel.findByIdAndUpdate(userId, { socketId: id });
                            console.log(`🧍 User ${userId} registered socket ${id}`);
                        } else if (role === 'captain') {
                            await captainModel.findByIdAndUpdate(userId, { socketId: id });
                            console.log(`🚗 Captain ${userId} registered socket ${id}`);
                        } else {
                            console.warn('⚠️ Invalid role:', role);
                            return;
                        }

                        safeSend(ws, {
                            type: 'registered',
                            message: `${role} registered successfully`,
                            socketId: id,
                        });
                    } catch (dbErr) {
                        console.error('❌ DB error:', dbErr.message);
                        safeSend(ws, { type: 'error', message: 'Database update failed' });
                    }
                }

                // 🔹 LOCATION UPDATE EVENT
                else if (data.type === 'locationUpdate' && data.userId && data.role && data.location) {
                    const { role, userId, location } = data;

                    try {
                        const latitude = parseFloat(location.latitude || location.lat);
                        const longitude = parseFloat(location.longitude || location.lng);

                        if (isNaN(latitude) || isNaN(longitude)) {
                            console.warn(`⚠️ Invalid location data:`, location);
                            return;
                        }

                        if (role === 'captain') {
                            const result = await captainModel.findByIdAndUpdate(
                                userId,
                                {
                                    $set: {
                                        'location': {
                                            type: 'Point',
                                            coordinates: [longitude, latitude]
                                        }
                                    }
                                },
                                { new: true, runValidators: true }
                            );

                            console.log(`✅ Captain ${userId} location updated to: [${longitude}, ${latitude}]`);

                            // Optional: broadcast captain’s updated position to all connected users
                            broadcastToAll({
                                event: 'captainLocationUpdate',
                                data: { userId, location: { latitude, longitude } },
                            });
                        }
                        else if (role === 'user') {
                            console.log(`🧍 User ${userId} location received:`, location);
                        }
                    } catch (err) {
                        console.error('❌ Failed to update location in DB:', err.message);
                        safeSend(ws, { type: 'error', message: 'Failed to update location' });
                    }
                }



                // 🔹 PING-PONG KEEP ALIVE
                else if (data.type === 'ping') {
                    safeSend(ws, { type: 'pong' });
                }

            } catch (err) {
                console.error('❌ Error parsing WebSocket message:', err.message);
                safeSend(ws, { type: 'error', message: 'Invalid message format' });
            }
        });

        ws.on('close', () => {
            clients.delete(id);
            console.log('🔌 WebSocket disconnected:', id);
        });

        ws.on('error', (err) => {
            console.error('⚠️ WebSocket error for', id, err);
        });
    });

    return wss;
}

// Send message safely
function safeSend(ws, payload) {
    try {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(payload));
            return true;
        }
    } catch (err) {
        console.error('❌ Failed to send WS message:', err.message);
    }
    return false;
}

// Send message to a specific socket
function sendMessageToSocketId(socketId, event, data) {
    const ws = clients.get(socketId);
    if (!ws || ws.readyState !== WebSocket.OPEN) {
        console.error('⚠️ WebSocket not available for id', socketId);
        return false;
    }

    console.log(`📤 Sending event "${event}" to socket ${socketId}:`, data); // 👈 ADD THIS LOG
    return safeSend(ws, { event, data });
}


// Broadcast to all clients
function broadcastToAll(payload) {
    for (const [id, ws] of clients.entries()) {
        if (ws.readyState === WebSocket.OPEN) {
            safeSend(ws, payload);
        }
    }
}

module.exports = { initializeSocket, sendMessageToSocketId, broadcastToAll };
