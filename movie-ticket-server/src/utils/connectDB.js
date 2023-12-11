const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async function () {
    let uri = process.env.DB_URL;
    await mongoose.connect(uri, { dbName: process.env.DB_NAME });
    console.log("Conntected to database !");
};

module.exports = connectDB;
