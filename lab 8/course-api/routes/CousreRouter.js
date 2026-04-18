const express = require('express');
const Course = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
    const newcourse = await Course.create(req.body);
    res.send(newcourse);
});

router.delete('/:id', async (req, res) => {
    const course = await Course.deleteOne({ _id: req.params.id });
    res.send(course);
});

router.get('/', async (req, res) => {
    const allcourses = await Course.find();
    res.send(allcourses);
});

router.put('/:id', async (req, res) => {
    const course = await Course.updateOne({ _id: req.params.id }, req.body, { new: true });
    res.send(course);
});

module.exports = router;