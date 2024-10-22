import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '8ac5c4d57ba6a4b3dfcf622700447b1e';


  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (error) {
      setWeather(null);
      setError(error.message);
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Weather App</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {weather && (
        <div style={styles.weatherInfo}>
          <h2 style={styles.city}>{weather.name}, {weather.sys.country}</h2>
          <p style={styles.temp}>{Math.round(weather.main.temp)}°C</p>
          <p style={styles.description}>{weather.weather[0].description}</p>
          <p style={styles.details}>Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#42aaf5',
    color: '#fff',
    padding: '20px',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px 0 0 5px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '0 5px 5px 0',
    border: '1px solid #ccc',
    cursor: 'pointer',
    backgroundColor: '#61dafb',
    color: '#000',
    outline: 'none',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  weatherInfo: {
    textAlign: 'center',
    marginTop: '20px',
  },
  city: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  temp: {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    textTransform: 'capitalize',
  },
  details: {
    fontSize: '1rem',
  },
};

export default App;