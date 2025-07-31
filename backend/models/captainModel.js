const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: { type: String, required: true, minlength: [3, 'firstname must contain at least 3 letters'] },
        lastname: { type: String, minlength: [3, 'lastname must contain at least 3 letters'] }
    },
    email: { type: String, required: true, unique: true, lowercase: true, match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'] },
    password: { type: String, required: true, select: false },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must contain at least 3 letters']
        },
        plateNumber: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, 'Plate number must contain at least 3 letters'],
            //match: [/^[A-Z0-9-]+$/, 'Please fill a valid plate number']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
        },
        location: {
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            }
        }
    }
})

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}
captainSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}
captainSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;