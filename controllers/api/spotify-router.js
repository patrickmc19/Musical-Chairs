const router = require('express').Router();
const express = require('express');
const app = express();
const spotAuth = require("../../util/spotifyAuth");

app.get('/spotify-auth', (req, res) => {
    spotAuth(res);
});

spotAuth();

// 