

function corectDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = corectDate(currentTime);

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = ` ${temperature}°C`;

  let humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `Humidity: ${humidity}%`;
  let windy = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `Wind: ${windy} km/h`;
  document.querySelector("#cloud").innerHTML = response.data.weather[0].main;
}

function curentPosition(position) {
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiWeather).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(curentPosition);
}

let currentLocal = document.querySelector("#current");
currentLocal.addEventListener("click", getCurrentLocation);

function searchCity(cityInput) {
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input").value;

  searchCity(cityInput);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);
