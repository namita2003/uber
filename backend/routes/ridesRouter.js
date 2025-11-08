const express = require('express')
const router = express.Router()
const { body,query } = require('express-validator')
const rideController = require('../controllers/rideController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('invalid pickup location'),
    body('destination').isString().isLength({ min: 3 }).withMessage('invalid destination location')
    , body('vehicleType').isIn(['bike', 'auto', 'car']).withMessage('invalid vehicle type'),
    rideController.createRide
)



router.get('/calculate-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('invalid pickup location'),
    query('destination').isString().isLength({ min: 3 }).withMessage('invalid destination location'),
    rideController.calculateFare
);

module.exports = router;