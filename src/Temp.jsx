import { useState, useEffect } from "react";
import "./Weather.css";

const Temp = () => {
  let apiKey = import.meta.env.VITE_API_KEY;
  apiKey = "127e814c921d448ebb7164527252301";

  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState({
    location: "",
    region: "",
    country: "",
    temp: "",
    fahrenheit: "",
  });

  useEffect(() => {
    // Get user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Location access denied. Please enter your city manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeather(location.lat, location.lon);
    }
  }, [location]);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&aqi=no&alerts=no`
      );

      if (!response.ok) {
        throw new Error("Weather data not found");
      }

      const data = await response.json();

      setWeatherData({
        location: data.location.name,
        region: data.location.region,
        country: data.location.country,
        temp: data.current.temp_c,
        fahrenheit: data.current.temp_f,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="weather">
      <div className="head">
        <h1>
          <i className="fa-solid fa-location-dot"></i>
        </h1>
        <h2>{weatherData.location}, </h2>
        <h4>{weatherData.region}</h4>
        <h4>{weatherData.country}</h4>
      </div>

      <div className="search">
        <input
          type="text"
          className="location-input"
          placeholder="Enter Your Location"
          spellCheck="false"
          onChange={(e) => setLocation({ city: e.target.value })}
        />
      </div>

      <div className="temp">
        <h1>{weatherData.temp}°C</h1>
      </div>
    </div>
  );
};

export default Temp;
