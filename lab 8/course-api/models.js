const mongoose = require('mongoose');

const Courseschema = new mongoose.Schema({
    Title: String,
    Description: String,
    Instructor_Name: String,
    Price: Number,
    Category: { type: String, enum: ["Programming", "Design", "Marketing", "Business"] },
    Number_of_Students: { type: Number, default: 0 },
});

module.exports = mongoose.model('Course', Courseschema);