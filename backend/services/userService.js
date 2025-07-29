const userModel = require('../models/userModels');


module.exports.registerUser = async ( {
    firstName , lastName, email, password } )=>{
        if(!firstName  || !email || !password){
            throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname: firstName,
            lastname: lastName
        },
        email,
        password
    });
    return user;
}