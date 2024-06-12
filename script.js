document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city) {
    const apiKey = 'a95f25fbc80b81d3178a7be6d8425353';                         // API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())                                     // Convert response to JSON
        .then(data => displayWeatherData(data))                                // Display the weather data
        .catch(error => console.error('Error fetching weather data:', error)); // Handle errors
}
    // Function to display the weather data on the page
    function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather-container');
    const weather = data.weather[0].main.toLowerCase();

    console.log('Weather condition:', weather);

    document.body.className = '';
    //adding img urls for the weather condition
    
    if (['clear', 'sunny'].includes(weather)) {             
        document.body.style.backgroundImage = 'url("sunny.jpg")';
    } else if (['clouds', 'cloudy'].includes(weather)) {
        document.body.style.backgroundImage = 'url("cloudy.jpg")';
    } else if (['rain', 'drizzle', 'thunderstorm'].includes(weather)) {
        document.body.style.backgroundImage = 'url("rainy.jpg")';
    } else if (['snow'].includes(weather)) {
        document.body.style.backgroundImage = 'url("snowy.jpg")';
    } else if (['haze', 'hazy'].includes(weather)) {
        document.body.style.backgroundImage = 'url("hazy.jpg")';
    } else if (['mist'].includes(weather)) {
        document.body.style.backgroundImage = 'url("misty.jpg")';
    }

    // Display the weather data in the weather container
    weatherContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Pressure: ${data.main.pressure} hPa</p>
        <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
        <p>${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
    `;
}

