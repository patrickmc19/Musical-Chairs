const router = require('express').Router();
const express = require('express');
const app = express();
const spotAuth = require("../../util/spotAuth");

app.get('/spotify-auth', (req, res) => {
    spotAuth(res);
});