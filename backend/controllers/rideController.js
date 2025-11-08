const riderService = require('../services/rideService');
const { validationResult } = require('express-validator');
const mapsService = require('../services/mapsService');
const { sendMessageToSocketId } = require("../socket")

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        // Line 12 (approximate) - Create ride in DB
        const ride = await riderService.createRide({
            userId: req.user._id,
            pickup,
            destination,
            vehicleType
        });
        
        // 🛑 CRITICAL FIX: Check immediately after service call 🛑
        // If the service failed and returned null, we stop here.
        if (!ride || !ride._id) { 
            console.error("❌ Ride creation failed. Service returned null or missing ID. Check rideService.createRide implementation.");
            return res.status(500).json({ message: "Failed to create ride: Internal database error." });
        }
        // If the original error was truly on line 17, and it was reading `_id`, 
        // this block should have already returned, preventing the crash.

        // Line 17 (approximate) - Get pickup coordinates
        const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);
        console.log('📍 Pickup coordinates:', pickupCoordinates);

        // Find captains nearby
        const captainRadius = await mapsService.getCaptainsInRadius(pickupCoordinates, 20); 
        ride.otp = "" // This line is safe now if 'ride' is valid

        // Prepare full ride details for broadcast
        const rideDetails = {
            rideId: ride._id, // This is the line that would have caused the crash if 'ride' was null
            pickup,
            destination,
            vehicleType,
            fareEstimate: ride.fareEstimate || 0,
            userId: req.user._id,
        };
        
        captainRadius.forEach((captain) => {
            if (captain.socketId) {
                // The crash reading `ride._id` is happening before here, 
                // but this line depends on a valid ride object.
                sendMessageToSocketId(captain.socketId, 'newRide', rideDetails);
                console.log(`📢 Sent new ride event to captain ${captain._id}`);
            }
        });

        // Send single response
        return res.status(201).json({
            message: 'Ride created successfully',
            ride,
            pickupCoordinates,
            captainRadius
        });

    } catch (error) {
        console.error("❌ Error creating ride:", error);
        if (!res.headersSent) {
            // Send back a generic message if the error was caught
            return res.status(500).json({ message: error.message || "An unknown error occurred during ride creation." });
        }
    }
};


module.exports.calculateFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        // get real distance
        const { distanceKm, timeHours } = await mapsService.getDistanceTime(pickup, destination);

        if (distanceKm === null) {
            return res.status(400).json({ message: 'Could not calculate distance' });
        }

        const fares = {
            car: Math.round(riderService.calculateFare(distanceKm, 'car')),
            bike: Math.round(riderService.calculateFare(distanceKm, 'bike')),
            auto: Math.round(riderService.calculateFare(distanceKm, 'auto'))
        };

        res.status(200).json({ fares });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
