//Current Date Time
let now = new Date();

let currentDate = document.querySelector("#current-date");
let currentTime = document.querySelector("#current-time");

let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let mins = now.getMinutes();
if (mins < 10) {
  mins = `0${mins}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentDate.innerHTML = `${day}, ${date}`;
currentTime.innerHTML = `${hour}:${mins}`;

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//Temp Search and Display

function displayForecast(response) {
  let forecastData = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `
        <div class="col">
            <div class="forecast-date">${formatForecastDate(
              forecastDay.time
            )}</div>
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png"
              alt=""
              width="40px"
            />
            <div class="forecast-temps">
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temperature.maximum
              )}°</span>
              <span class="forecast-temp-min">${Math.round(
                forecastDay.temperature.minimum
              )}°</span>
            </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "3otb16192f2361042505a3f67b74408b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getSearchWeather(response) {
  celsiusTemp = response.data.temperature.current;
  let temperature = Math.round(celsiusTemp);
  document.querySelector("#current-city-temp").innerHTML = `${temperature}`;
  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-city-description").innerHTML =
    response.data.condition.description;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "3otb16192f2361042505a3f67b74408b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getSearchWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  // console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3otb16192f2361042505a3f67b74408b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getSearchWeather);
}

function getCurrentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocationWeather);

searchCity("Toronto");
