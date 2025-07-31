const captainModel = require('../models/captainModel');



module.exports.createCaptain = async ({
    firstnane,
    lastname,
    email,
    password,
    color,
    plateNumber,
    capacity,
    vehicleType
})=>{
    if(!firstnane || !lastname || !email || !password || !color || !plateNumber || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname: {
            firstname: firstnane,
            lastname: lastname
        },
        email,
        password,//: await captainModel.hashPassword(password),
        vehicle: {
            color,
            plateNumber,
            capacity,
            vehicleType
        }
    });
    return captain;
}