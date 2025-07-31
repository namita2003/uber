const express = require('express');
const router = express.Router();
const {body}= require('express-validator');
//const { use } = require('react');
const captainController = require('../controllers/captainController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register',
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plateNumber').isLength({ min: 3 }).withMessage('Vehicle plate number must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be one of: car, bike, truck'),
    captainController.registerCaptain);
    
router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], captainController.loginCaptain);

module.exports = router;

router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile );

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);