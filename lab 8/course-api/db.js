const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/IP-lab8";

const databaseconnection = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
    } 
};

module.exports = databaseconnection;