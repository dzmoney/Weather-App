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

//Temp Search and Display

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col">
            <div class="forecast-date">${day}</div>
            <img
              src="http://openweathermap.org/img/wn/03d@2x.png"
              alt=""
              width="40px"
            />
            <div class="forecast-temps">
              <span class="forecast-temp-max">8°</span>
              <span class="forecast-temp-min">0°</span>
            </div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
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
}

function searchCity(city) {
  let apiKey = "3otb16192f2361042505a3f67b74408b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(getSearchWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

// function searchCurrentLocation(position) {
//   let latitude = position.coords.latitude;
//   let longitude = position.coords.longitude;
//   let apiKey = "3otb16192f2361042505a3f67b74408b";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

//   axios.get(apiUrl).then(getSearchWeather);
// }

// function getCurrentLocationWeather(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(searchCurrentLocation);
// }

//Celsius / Fahrenheit

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let tempDisplay = document.querySelector("#current-city-temp");
  tempDisplay.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#current-city-temp").innerHTML =
    Math.round(celsiusTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// let currentLocationButton = document.querySelector("#current-location-button");
// currentLocationButton.addEventListener("click", getCurrentLocationWeather);

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

displayForecast();
searchCity("Toronto");
