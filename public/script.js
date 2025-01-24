const apiKey = "127e814c921d448ebb7164527252301"; // Your API key

// Elements from the DOM
const dropdown = document.getElementById("city-dropdown");
const cityNameElem = document.getElementById("city-name");
const temperatureElem = document.getElementById("temperature");
const conditionElem = document.getElementById("condition");
const humidityElem = document.getElementById("humidity");
const windSpeedElem = document.getElementById("wind-speed");
const weatherIconElem = document.getElementById("weather-icon");

// Weather icons map
const weatherIconMap = {
  Sunny: "fas fa-sun",
  Clear: "fas fa-moon",
  Rain: "fas fa-cloud-showers-heavy",
  Snow: "fas fa-snowflake",
  Clouds: "fas fa-cloud",
  Mist: "fas fa-smog",
};

// Fetch weather data
async function fetchWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    updateWeatherInfo(data);
  } catch (error) {
    console.error("Error:", error.message);
    alert("Could not fetch weather data. Please try again later.");
  }
}

// Update the weather information in the UI
function updateWeatherInfo(data) {
  const { location, current } = data;

  cityNameElem.textContent = location.name;
  temperatureElem.textContent = `${current.temp_c}°C`;
  conditionElem.textContent = current.condition.text;
  humidityElem.textContent = `${current.humidity}%`;
  windSpeedElem.textContent = `${current.wind_kph} km/h`;

  // Set weather icon based on condition
  const weatherCondition = current.condition.text;
  weatherIconElem.className =
    weatherIconMap[weatherCondition] || "fas fa-question";
}

// Event listener for dropdown
dropdown.addEventListener("change", (e) => {
  const selectedCity = e.target.value;
  fetchWeather(selectedCity);
});

// Initial fetch for default city
fetchWeather("wakad");
