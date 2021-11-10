const express = require('express');
const app = express();
const authenRouter = require('../Routers/Router');

app.use(express.json())

app.use('/api', authenRouter);
module.exports = app;

