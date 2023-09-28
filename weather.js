const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const axios = require('axios');


const app = express();


const serviceAccount = require('./key.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/u/0/project/ushasri-33380/overview',  
});


app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/weather/:city', async (req, res) => {
  const { city } = req.params;

  
  const apiKey = 'b272e805a3590f9b4cfddfaae0c66a4c';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function fetchWeatherData(city) {
   
    const apiUrl = `/api/weather/${city}`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        
        const cityName = data.name;
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
  
       
        const weatherInfo = `Weather in ${cityName}: ${temperature}°C, ${weatherDescription}`;
        document.getElementById('weather-info').textContent = weatherInfo;
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }
  
 
  function searchPlace() {
    const placeInput = document.getElementById('place-input');
    const cityName = placeInput.value;
  
    if (cityName) {
      fetchWeatherData(cityName);
    } else {
      alert('Please enter a place.');
    }
  }
  
  
  
