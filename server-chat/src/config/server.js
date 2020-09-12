const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('../routes/index'));


module.exports = {app, express, server};