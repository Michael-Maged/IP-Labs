const express = require('express');
const databaseconnection = require('./course-api/db');
const courseRouter = require('./course-api/routes/CousreRouter');

const app = express();
app.use(express.json());
app.use('/courses', courseRouter);

databaseconnection();
app.listen(3000, () => console.log('Server is running on port 3000'));