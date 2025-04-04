require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.get('/weather', async (requestAnimationFrame, res) => [
    const city = request.query.city;
    const apiKey = process.env.API_KEY;

    if(!city) {
        return res.status(400).send({error: 'City name is required.'});
    }

    try {
        const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}');

        res.send(weatherResponse.data);
    } 
    
    catch (error) {
        res.status(500).send({ error: 'Failed to fetch weather data.'});
    }
]);

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});