// MAIN WEATHER DATA

function displayCurrentWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  // celsiusTemperature used to be null
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#main-temp").innerHTML = celsiusTemperature;

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#day-description").innerHTML =
    response.data.weather[0].description;
  let icon = response.data.weather[0].icon;
  document
    .querySelector("#current-icon")
    .setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
}

// DAY

let dayTime = new Date();

function currentDayFunction(date) {
  let year = date.getFullYear();
  let dayNumber = date.getDate();
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[date.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${dayNumber}.${month}.${year}`;
}

let currentDay = document.querySelector("#updated-date");
currentDay.innerHTML = currentDayFunction(dayTime);

// TIME

function currentTimeFunction(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hour = date.getHours();
  let AmPm = hour <= 11 ? "am" : "pm";
  hour = hour % 12 || 12;

  return `${hour}:${minutes} ${AmPm}`;
}

let currentTime = document.querySelector("h2");
currentTime.innerHTML = currentTimeFunction(dayTime);

// C° & F° TRANSFORMATION

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusElement = document.querySelector("#main-temp");
  celsiusElement.innerHTML = celsiusTemperature;
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#main-temp");
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemp;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusTemperature = null;

// SEARCH ENGINE
function searchCity(city) {
  let unit = "metric";
  let apiKey = "7397d5769aa7c8ab77c0945b1e990b7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayCurrentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayForecast);
}

//  FORM SEARCH ENGINE
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCityData);

function searchCityData(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  searchCity(city);
}

// GEOLOCATION SEARCH ENGINE

document
  .querySelector("#location-btn")
  .addEventListener("click", returnGeoLocation);

function returnGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiKey = "7397d5769aa7c8ab77c0945b1e990b7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayCurrentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayForecast);
}

// FORECAST

function forecastHour(timestamp) {
  let date = new Date(timestamp);
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${hour}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;

  for (let index = 0; index < 5; index++) {
    let forecast = response.data.list[index];
    let maxTemp = Math.round(forecast.main.temp_max);
    let minTemp = Math.round(forecast.main.temp_min);
    let forecastIcon = forecast.weather[0].icon;

    forecastElement.innerHTML += `
    <div class="col-sm">
      <ul>
        <li>
          ${forecastHour(forecast.dt * 1000)}
        </li>
        <li>
          <img
            src="http://openweathermap.org/img/wn/${forecastIcon}@2x.png"/>
        </li>
        <li>${maxTemp}°/${minTemp}°</li>
      </ul>
    </div>
            `;
  }
}

// DEFAULT CITY
searchCity("Sunshine Coast");
