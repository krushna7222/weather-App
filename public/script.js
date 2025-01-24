const apiKey = "127e814c921d448ebb7164527252301"; // Replace with your API key
const locationName = "wakad"; // Default location

const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");
const locationElement = document.getElementById("location");
const conditionElement = document.getElementById("condition");
const temperatureElement = document.getElementById("temp");
const hourlyForecastContainer = document.getElementById("hourly-forecast");
const weeklyForecastContainer = document.getElementById("weekly-forecast");

// Get elements for user input
const userLocationInput = document.getElementById("user-location");
const getWeatherButton = document.getElementById("get-weather-btn");

// Fetch weather data from API
async function fetchWeather(location) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error(error.message);
    alert("Could not fetch weather data. Please try again later.");
  }
}

// Update UI with fetched data
function updateUI(data) {
  const { location, current, forecast } = data;

  // Date and time
  const now = new Date();
  dateElement.textContent = now.toDateString();
  timeElement.textContent = now.toLocaleTimeString();

  // Location and condition
  locationElement.textContent = `${location.name}, ${location.region}`;
  conditionElement.textContent = current.condition.text;

  // Temperature
  temperatureElement.innerHTML = `${current.temp_c}<span>°C</span>`;

  // Hourly forecast
  hourlyForecastContainer.innerHTML = "";
  forecast.forecastday[0].hour.forEach((hourData, index) => {
    if (index % 3 === 0) {
      // Show every 3 hours
      const hourElement = document.createElement("div");
      hourElement.className = "hour";
      hourElement.innerHTML = `
        <p>${new Date(hourData.time).getHours()}:00</p>
        <i class="fas fa-${getWeatherIcon(hourData.condition.text)}"></i>
        <p>${hourData.temp_c}°C</p>
      `;
      hourlyForecastContainer.appendChild(hourElement);
    }
  });

  // Weekly forecast
  weeklyForecastContainer.innerHTML = "";
  forecast.forecastday.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.className = "day";
    dayElement.innerHTML = `
      <p>${new Date(day.date).toLocaleDateString("en-US", {
        weekday: "short",
      })}</p>
      <i class="fas fa-${getWeatherIcon(day.day.condition.text)}"></i>
      <p>${day.day.maxtemp_c}° / ${day.day.mintemp_c}°</p>
    `;
    weeklyForecastContainer.appendChild(dayElement);
  });
}

// Get appropriate weather icon
function getWeatherIcon(condition) {
  if (condition.includes("Sunny") || condition.includes("Clear")) return "sun";
  if (condition.includes("Cloudy") || condition.includes("Overcast"))
    return "cloud";
  if (condition.includes("Rain") || condition.includes("Drizzle"))
    return "cloud-rain";
  if (condition.includes("Snow")) return "snowflake";
  if (condition.includes("Thunder") || condition.includes("Storm"))
    return "bolt";
  if (
    condition.includes("Mist") ||
    condition.includes("Fog") ||
    condition.includes("Haze")
  )
    return "smog";
  return "question"; // Default icon if no match
}

// Add event listener to button
getWeatherButton.addEventListener("click", () => {
  const location = userLocationInput.value.trim();
  if (location) {
    fetchWeather(location);
  } else {
    alert("Please enter a location name.");
  }
});

// Fetch default location weather on page load
fetchWeather(locationName);
