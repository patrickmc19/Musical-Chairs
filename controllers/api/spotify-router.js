const router = require('express').Router();
const express = require('express');
const app = express();
// const spotAuth = require("../../util/spotifyAuth");
const axios = require('axios');
const accessToken = 'BQDtEzHM5alRks0G79mIW5zn_rW1RN-EuAg0JCjYa4xaYjT_P1FlXXWGdReMG1OWT9GmhxF_jMr8Qp7Xo2jEibGJDKJvASmUlSXDsLLUwAy85veXOmx5 ';

// app.get('/spotify-auth', (req, res) => {
//     spotAuth(res);
// });

app.get('/tracks', async (req, res) => {
    const query = req.query.q;
    const type = 'track';
    const url = `https://api.spotify.com/v1/search?q=${query}&type=${type}`;

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

