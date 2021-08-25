function showPosition(position) {
  console.log(position);
  let latitude = `${position.coords.latitude}`;
  console.log(latitude);
  let longitude = `${position.coords.longitude}`;
  console.log(longitude);
  let apiKey = "3ba4ba419c4c391e4a4ac38b121708bc";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(`${url}&appid=${apiKey}`).then(showWeather);
}

function showWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.current.temp);
  console.log(temperature);
  let city = `${response.data.timezone}`;
  console.log(city);
  let h3 = document.querySelector("#city-name");
  h3.innerHTML = `${city}`;
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${temperature}°C`;
  let description = `${response.data.current.weather[0].description}`;
  console.log(description);
  let div = document.querySelector("#description");
  div.innerHTML = `${description}`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

function showTemperature(response) {
  console.log(response);
  let degrees = Math.round(response.data.main.temp);
  console.log(degrees);
  let span = document.querySelector("#temp");
  span.innerHTML = `${degrees}°C`;
  let descr = `${response.data.weather[0].description}`;
  let div = document.querySelector("#description");
  div.innerHTML = `${descr}`;
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h3 = document.querySelector("#city-name");
  if (cityInput.value) {
    h3.innerHTML = `${cityInput.value}`;
  } else {
    h3.innerHTML = null;
    alert("Please type the name of your City.");
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&APPID=3ba4ba419c4c391e4a4ac38b121708bc&units=metric`;
  axios.get(`${url}`).then(showTemperature);
}

let h2 = document.querySelector("#current-city");
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = weekDays[now.getDay()];
h2.innerHTML = ` ${weekDay}${hours}:${minutes}`;
