// date and time

let today = new Date();

let date = today.getDate();
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hour = today.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let currentDate = document.querySelector(".day");
currentDate.innerHTML = date;

let currentHour = document.querySelector(".hour");
currentHour.innerHTML = hour;

let currentMinutes = document.querySelector(".minutes");
currentMinutes.innerHTML = minutes;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[today.getDay()];
let currentDay = document.querySelector(".weekday");
currentDay.innerHTML = day;

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[today.getMonth()];
let currentMonth = document.querySelector(".month");
currentMonth.innerHTML = month;

// change city

function changeCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let searchForm = document.querySelector(".form-control");
  h1.innerHTML = `${searchForm.value}`;

  searchCity(searchForm.value);
}

// search city

function searchCity(city) {
  let url = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let apiUrl = `${url}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

// geolocation

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
}

navigator.geolocation.getCurrentPosition(handlePosition);

let showCurrentPosition = document.querySelector(".current");
showCurrentPosition.addEventListener("click", getCurrentLocation);

// display temperature

function showCurrentTemperature(response) {
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].main;
}
function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city");
  searchCity(city.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
