const axios = require('axios');
const captainModel = require('../models/captainModel');

// Helper function to calculate distance (extracted from getDistanceTime logic)
const calculateHaversineDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const toRad = (deg) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;

    return distanceKm;
};

module.exports.getAddressCoordinate = async (address) => {
    if (!address) throw new Error('Address is required');

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const response = await axios.get(url, { headers: { 'User-Agent': 'Node.js App' } });

    if (!response.data.length) throw new Error('No results found for this address');

    const loc = response.data[0];
    return { lat: parseFloat(loc.lat), lng: parseFloat(loc.lon) };
};

module.exports.getDistanceTime = async (originAddress, destinationAddress) => {
    if (!originAddress || !destinationAddress) throw new Error('Origin and destination are required');

    const originRes = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(originAddress)}`, { headers: { 'User-Agent': 'Node.js App' } });
    const destRes = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destinationAddress)}`, { headers: { 'User-Agent': 'Node.js App' } });

    if (!originRes.data.length || !destRes.data.length) throw new Error('Could not find coordinates for origin or destination');

    const origin = { lat: parseFloat(originRes.data[0].lat), lng: parseFloat(originRes.data[0].lon) };
    const destination = { lat: parseFloat(destRes.data[0].lat), lng: parseFloat(destRes.data[0].lon) };

    const distanceKm = calculateHaversineDistance(origin.lat, origin.lng, destination.lat, destination.lng);
    const timeHours = distanceKm / 50; // assuming 50 km/h average

    return { distanceKm, timeHours };
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Input is required');
    }

    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&addressdetails=1&limit=5`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Node.js App' // required by Nominatim
            }
        });

        if (!response.data.length) {
            return []; // return empty array if no suggestions
        }

        // Map results to a simple structure
        const suggestions = response.data.map(place => ({
            display_name: place.display_name,
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon),
        }));

        return suggestions;

    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error.message);
        throw new Error('Failed to fetch autocomplete suggestions');
    }
};

module.exports.getCaptainsInRadius = async (pickupCoordinates, radiusKm = 20) => {
    if (!pickupCoordinates) throw new Error("pickupCoordinates is undefined");

    const riderLat = pickupCoordinates.latitude || pickupCoordinates.lat;
    const riderLng = pickupCoordinates.longitude || pickupCoordinates.lng;

    if (typeof riderLat !== "number" || typeof riderLng !== "number") {
        throw new Error(`Invalid rider coordinates: ${JSON.stringify(pickupCoordinates)}`);
    }

    console.log(`📍 Searching captains within ${radiusKm} km of:`, riderLat, riderLng);

    // Fetch captains that have valid location
    const allCaptains = await captainModel.find({
        'location.coordinates': { $exists: true, $ne: null }
    }).lean();
    console.log("Total captains found:", allCaptains.length);
    allCaptains.forEach(c => console.log("Captain:", c.fullname, c.location.coordinates));

    const captainsInRadius = allCaptains.filter(captain => {
        if (
            !captain.location ||
            !Array.isArray(captain.location.coordinates) ||
            captain.location.coordinates.length !== 2
        ) return false;

        const [lng, lat] = captain.location.coordinates;
        if (typeof lat !== "number" || typeof lng !== "number") return false;

        const distance = calculateHaversineDistance(riderLat, riderLng, lat, lng);
        return distance <= radiusKm;
    });

    console.log(`🧭 Found ${captainsInRadius.length} captains in radius.`);
    return captainsInRadius;
};

