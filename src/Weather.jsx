import { useState, useEffect } from "react";
import "./Weather.css";

const Weather = () => {
  //   let apiKey = import.meta.env.VITE_API_KEY;
  let apiKey = "127e814c921d448ebb7164527252301";
  const [location, setLocation] = useState("Wakad");
  const [weatherData, setWeatherData] = useState({
    location: "",
    region: "",
    country: "",
    temp: "",
    faranhite: "",
  });

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.current);
        if (data.location.country == "India") {
          setWeatherData({
            location: response.location.name,
            region: response.location.region,
            country: response.location.country,
            temp: response.current.temp_c,
            faranhite: response.current.temp_f,
          });
        }
      });
  }, [location]);
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
        <div>
          <input
            type="text"
            className="location-input"
            placeholder="Enter Your Location"
            spellCheck="false"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {/* <div>
          <button className="search-btn">Search</button>
        </div> */}
      </div>

      <div className="temp">
        <h1>{weatherData.temp}°C</h1>
      </div>
    </div>
  );
};

export default Weather;
