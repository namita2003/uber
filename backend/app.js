const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/userRouter');
const cookieParser= require('cookie-parser');
const captainRoutes = require('./routes/captainRouter');

// Connect to the database
connectToDb();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //encoding url
app.use(cookieParser()); // for parsing cookies

//console.log();



app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;