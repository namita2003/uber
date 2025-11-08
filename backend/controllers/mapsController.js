const mapsService = require('../services/mapsService');
const { validationResult } = require('express-validator');

module.exports.getCoordintes = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { address } = req.query;
        const coordinates = await mapsService.getAddressCoordinate(address);
        res.status(200).json({ coordinates });
    } catch (error) {
        console.error('Error in getCoordintes:', error.message);
        res.status(404).json({ message: 'Failed to fetch coordinates', error: error.message });
    }
};

module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { origin, destination } = req.query;
        const distanceTime = await mapsService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (err) {
        console.error('Error in getDistanceTime:', err.message);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};


module.exports.getAutoCompleteSuggestions = async (req, res) => {
    const { input } = req.query;
    try {
        const suggestions = await mapsService.getAutoCompleteSuggestions(input);
        res.json(suggestions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
