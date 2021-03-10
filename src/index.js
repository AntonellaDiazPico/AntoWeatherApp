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

// C° & F° TRANSFORMATION (need to improve!!!)

function giveMeCelsius(event) {
  event.preventDefault();
  let changeTempToCelsius = document.querySelector("#main-temp");
  changeTempToCelsius.innerHTML = 21;
}

let tempInCel = document.querySelector("#celsius-link");
tempInCel.addEventListener("click", giveMeCelsius);

function giveMeFahrenheit(event) {
  event.preventDefault();
  let changeTempToFahrenheit = document.querySelector("#main-temp");
  let temperature = changeTempToFahrenheit.innerHTML;
  changeTempToFahrenheit.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let tempInFar = document.querySelector("#fahrenheit-link");
tempInFar.addEventListener("click", giveMeFahrenheit);

// SEARCH ENGINE
function searchCity(city) {
  let unit = "metric";
  let apiKey = "7397d5769aa7c8ab77c0945b1e990b7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayCurrentWeather);
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

document.querySelector("#location-btn").addEventListener("click", returnGeoLocation);

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
}

// CURRENT WEATHER DATA

function displayCurrentWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#day-description").innerHTML =
    response.data.weather[0].description;
}

searchCity("Sunshine Coast");