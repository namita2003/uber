const axios = require('axios');

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

    // Haversine distance calculation
    const R = 6371;
    const toRad = (deg) => (deg * Math.PI) / 180;

    const dLat = toRad(destination.lat - origin.lat);
    const dLon = toRad(destination.lng - origin.lng);

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(origin.lat)) * Math.cos(toRad(destination.lat)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;
    const timeHours = distanceKm / 50; // assuming 50 km/h average

    return { distanceKm, timeHours };
};
