function homePage() {
    const currentPage = document.querySelector('h2').innerText;
    const homePageName = 'Weather App';
    const tempDivInfo = document.getElementById('temp-div');

    if (currentPage === homePageName && tempDivInfo.innerHTML === '') {
        alert('Already on Home Page');
    } else if (currentPage === homePageName && tempDivInfo.innerHTML !== '') {
        location.reload();
    }
}


function getWeather() {
    const apiKey = '264a724c8d4f6e7f6e5ff53919e401e3';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }


    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    // Fetch forecast weather
    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Error fetching forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round((data.main.temp - 273.15) * 9 / 5 + 32); // Conversion from Kelvin to Fahrenheit
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°F</p>
        `;
        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    hourlyForecastDiv.innerHTML = ''; // Clear previous content

    next24Hours.forEach(item => {
        const dataTime = new Date(item.dt * 1000);
        const hour = dataTime.toLocaleTimeString('en-US', {hour: 'numeric', hour12: true});

        const temperature = Math.round((item.main.temp - 273.15) * 9 / 5 + 32); // Conversion from Kelvin to Fahrenheit
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; 

        const hourlyItemHtml = `
        <div class="hourly-item">
            <span>${hour}</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°F</span>
        </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}