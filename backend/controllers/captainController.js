const captainModel = require('../models/captainModel');
const captainService = require('../services/captainService');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;

    const isCaptainExists = await captainModel.findOne({ email });
    if (isCaptainExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }
    const hashedPassword = await captainModel.hashPassword(password);
    // Ensure the password is hashed before passing it to the service
    // This assumes that the captainModel has a method to hash passwords
    try {
        const captain = await captainService.createCaptain({
            firstnane: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plateNumber: vehicle.plateNumber,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
        const token = captain.generateAuthToken();
        res.status(201).json({ message: 'Captain registered successfully', captain });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}