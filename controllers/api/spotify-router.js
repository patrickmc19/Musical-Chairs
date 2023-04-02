const router = require('express').Router();
const express = require('express');
const app = express();
const spotAuth = require("../../util/spotifyAuth");

// const spotAuth = require("../../util/spotifyAuth");
const axios = require('axios');
const accessToken = 'BQBgyyqT4H1H1-Wu5DwPKquqUA4fOxNikEE90DLw7z_XGZb5d2Slq3jeiKB7bDK6o7uzUtYqbOXvXBeYRD_aEcPPVMod3yL-ZdrEeEeiK1h4UuldQ4Uu';

app.get('/spotify-auth', (req, res) => {
    spotAuth(res);
});

spotAuth();


app.get('/search', async (req, res) => {
    console.log('search request received');
    const query = req.query.q;
    const type = 'track';
    const url = `https://api.spotify.com/v1/search?q=${query}&type=${type}`;
    console.log('url:', url);

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const tracks = response.data.tracks.items;
        res.json(tracks);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});



// spotAuth();
module.exports = router

