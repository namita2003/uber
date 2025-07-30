const userModel = require('../models/userModels');
const userService = require('../services/userService');
const { validationResult } = require('express-validator');
//const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistTokenModel');
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.registerUser({
        firstName: fullname.firstname,
        lastName: fullname.lastname,
        email,
        password: hashedPassword
    });
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();

    res.cookie('token', token);
    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: 'User logged out successfully' });
    // Optionally, you can also add the token to a blacklist if you want to invalidate it immediately
    // await blacklistTokenModel.create({ token: req.cookies.token });
    // res.status(200).json({ message: 'User logged out successfully and token black
}