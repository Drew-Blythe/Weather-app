require('dotenv').config();

const cors = require('cors')
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    if(!city) {
        return res.status(400).send({error: 'City name is required.'});
    }

    try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

        res.send(weatherResponse.data);
    } 
    
    catch (error) {
        res.status(500).send({ error: 'Failed to fetch weather data.'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.get('/forecast', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    if (!city) {
        return res.status(400).send({ error: 'City name is required.' });
    }

    try {
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        res.send(forecastResponse.data);
    } catch (error) {
        console.error('Error fetching forecast data:', error.message);
        res.status(500).send({ error: 'Failed to fetch forecast data.' });
    }
});
