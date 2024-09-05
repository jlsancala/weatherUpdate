document.addEventListener('DOMContentLoaded', async function() {
    const apiKey = 'cc68bd4d6b26495ba2d60337241208';
    const defaultCityName = 'Iligan'; // Use a variable for the default city name
    const apiEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${defaultCityName}&days=7`;

    async function fetchWeatherData(city) {
        const endpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;
        try {
            const response = await fetch(endpoint); // Wait for the fetch to complete
            const weatherData = await response.json(); // Wait for the response to be parsed into JSON
            
            const weatherContainer = document.getElementById('weather');
            weatherContainer.innerHTML = ''; // Clear previous weather data
            
            weatherData.forecast.forecastday.forEach(element => {
                console.log(element);

                weatherContainer.innerHTML += `
                <div class="weather-container">
                    <div class="weather-item">
                        <img src="https:${element.day.condition.icon}">
                    </div>
                    <div class="weather-item">
                        <span class="label">Current Date:</span>
                        <span class="value">${element.date}</span>
                    </div>
                    <div class="weather-item">
                        <span class="label">Weather Information:</span>
                        <span class="value">${element.day.condition.text}</span>
                    </div>
                    <div class="weather-item">
                        <span class="label">Temperature:</span>
                        <span class="value">${element.day.avgtemp_c}°C</span>
                    </div>
                    <div class="weather-item">
                        <span class="label">Humidity:</span>
                        <span class="value">${element.day.avghumidity}%</span>
                    </div>
                </div>
                `;
            });
        } catch (error) {
            const weatherContainer = document.getElementById('weather');
            weatherContainer.innerHTML = `<p>Unable to retrieve weather data: ${error.message}</p>`;
        }
    }

    // Fetch initial weather data for the default city
    fetchWeatherData(defaultCityName);

    document.getElementById('searchButton').addEventListener('click', () => {  
        const cityInput = document.getElementById('cityInput').value;  
        if (cityInput) {
            document.querySelector('.location-label').innerText = cityInput;
            fetchWeatherData(cityInput);
        } else {
            alert('Please enter a city name');
        }
    });
});