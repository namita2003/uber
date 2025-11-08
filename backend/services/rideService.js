const crypto = require('crypto');
const rideModel = require('../models/rideModel');
const mapsService = require('../services/mapsService');

// Fare calculation function
function calculateFare(distanceKm, vehicleType) {
    let baseFare, perKm;

    switch (vehicleType.toLowerCase()) {
        case 'bike':
            baseFare = 20;
            perKm = 5;
            break;
        case 'auto':
            baseFare = 30;
            perKm = 8;
            break;
        case 'car':
            baseFare = 50;
            perKm = 10;
            break;
        default:
            throw new Error('Invalid vehicle type');
    }

    return baseFare + perKm * distanceKm;
}

// 🔐 OTP generation using crypto
function getOtp(num) {
    // Generate random bytes, then convert to digits
    const randomBytes = crypto.randomBytes(num);
    let otp = '';
    for (let i = 0; i < num; i++) {
        otp += (randomBytes[i] % 10).toString(); // each digit 0–9
    }

    // Optional: hash OTP before storing (for security)
    const hashedOtp = crypto
        .createHash('sha256')
        .update(otp)
        .digest('hex');

    // Return both (in real app, send OTP to user, store only hash)
    return { otp, hashedOtp };
}

module.exports = {
    calculateFare,
    createRide: async ({ userId, pickup, destination, vehicleType }) => {
        if (!userId || !pickup || !destination || !vehicleType) {
            throw new Error('Missing required fields');
        }

        const { distanceKm, timeHours } = await mapsService.getDistanceTime(pickup, destination);

        if (distanceKm === null || timeHours === null) {
            throw new Error('Could not calculate distance between locations');
        }

        const fare = calculateFare(distanceKm, vehicleType);

        const ride = await rideModel.create({
            user: userId,
            pickup,
            destination,
            otp: getOtp(6).hashedOtp,
            vehicleType,
            distanceKm,
            timeHours,
            fare
        });

        return ride;
    },
};

