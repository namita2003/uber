const captainModel = require('../models/captainModel');
const captainService = require('../services/captainService');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistTokenModel');
const mapsService = require('../services/mapsService');
module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle, homeAddress } = req.body;

    if (!homeAddress) {
        return res.status(400).json({ message: "Registration requires a homeAddress for initial location." });
    }

    const isCaptainExists = await captainModel.findOne({ email });
    if (isCaptainExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    try {
        const hashedPassword = await captainModel.hashPassword(password);

        // 🧭 1️⃣ Convert address → coordinates
        const { lat, lng } = await mapsService.getAddressCoordinate(homeAddress);
        console.log(`📍 Captain home address resolved to: ${lat}, ${lng}`);

        // 🧩 2️⃣ Create captain using service, passing location correctly
        const captain = await captainService.createCaptain({

            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            vehicle,
            location: {
                type: 'Point',
                coordinates: [lng, lat], // longitude first!
                updatedAt: new Date()
            },
            status: 'active'
        });

        if (!captain) {
            return res.status(500).json({ message: 'Failed to create captain. Service returned null.' });
        }

        // 🪪 3️⃣ Generate token
        const token = captain.generateAuthToken();

        res.status(201).json({
            message: 'Captain registered successfully',
            captain,
            token
        });

    } catch (error) {
        console.error("❌ Captain registration failed:", error);
        const errorMessage = error.message.includes("No results found")
            ? "Could not find coordinates for the provided address. Please try a different address."
            : error.message || "An unknown error occurred during registration.";

        res.status(500).json({ message: errorMessage });
    }
};

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = captain.generateAuthToken();

    res.cookie('token', token);
    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Captain logged out successfully' });
    // Optionally, you can also add the token to a blacklist if you want to invalidate it immediately
    // await blacklistTokenModel.create({ token: req.cookies.token });
    // res.status(200).json({ message: 'Captain logged out successfully and token blacklisted' });
}