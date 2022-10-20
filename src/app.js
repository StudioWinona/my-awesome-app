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
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let apiUrl = `${url}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

// geolocation

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);

}

let showCurrentPosition = document.querySelector(".current");
showCurrentPosition.addEventListener("click", getCurrentLocation);

// display temperature

function showCurrentTemperature(response) {
  console.log(response.data);
  celsiusTemperature = response.data.main.temp;

  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city");
  searchCity(city.value);
}

searchCity("Paris");


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// get forecast

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
 console.log(response.data.daily);
 let days = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  days.forEach(function (forecastDay, index) {
    if (index < 6) {

  forecastHTML =
      forecastHTML +
      `
    <div class="col">
          <div class="card" style="width: 4rem;">
            <div class="card-body">
              <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="30" />
              <div class="row">
                <p class="card-text col">${Math.round(forecastDay.temp.day)}</p>
              </div>
            </div>
          </div>
    </div>
      `;}
  });

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;
}

// switch celsius and fahrenheit

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
