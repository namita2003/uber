const mongoose = require('mongoose');
//const { unique } = require('next/dist/build/utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: { type: String, required: true,minlength: [3,'firstname must contain atleast 3 letters'] },
        lastname: { type: String,minlength: [3,'lastname must contain atleast 3 letters'] }
    },
    email: { type: String, required: true, unique: true,minlength: [5,'email must contain atleast 5 letters'] },
    password: { type: String, required: true, select:false},
    socketId: {
        type: String,
        
}})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;