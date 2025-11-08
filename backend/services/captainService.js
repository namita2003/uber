const captainModel = require('../models/captainModel');

/**
 * Creates a new Captain document in the database.
 * The controller handles geocoding and passes a complete 'vehicle' object 
 * that already contains the 'location' property.
 * * @param {object} captainData - Data containing separated name parts, 
 * email, hashed password, and the full vehicle object with location.
 * @returns {Promise<captainModel>} The newly created Captain document.
 */
module.exports.createCaptain = async (captainData) => {
    // Destructure the expected fields from the controller
    const { 
        firstname, 
        lastname, 
        email, 
        password, // already hashed
        vehicle,  // This object is complete and includes the location coordinates
        status = 'active'
    } = captainData;

    // Removing the redundant 'if' check, as the controller handles the main validation.
    // NOTE: The typo 'firstnane' has been corrected to 'firstname' here.

    // Restructure the data to match the Mongoose schema exactly for creation.
    const captain = await captainModel.create({
        fullname: {
            firstname: firstname,
            lastname: lastname
        },
        email,
        password, 
        vehicle, // We now pass the complete vehicle object, including the 'location' field.
        status
    });

    return captain;
}
