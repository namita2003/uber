const mongoose = require('mongoose');

function connectToDb() {
    //const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/mydatabase';

    const url = process.env.DB_URL;

    mongoose.connect(url)
        .then((result) => {
            console.log('connected to mongoDB');

        }).catch((err) => {
            console.log('error connecting to mongoDB:', err.message);

        });
}

module.exports = connectToDb;