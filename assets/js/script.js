const currentElement = document.getElementById("weatherinfo");

// fetch geo coordinates

fetch(
  "http://api.openweathermap.org/geo/1.0/direct?q=chicago,IL,&limit=1&appid=f143fe1fd933ca340292950f394916e2"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (lat_lon) {
    // console.log(lat_lon);
    const lat = lat_lon[0].lat;
    const lon = lat_lon[0].lot;
    const state = lat_lon[0].state;
  });

// fetch current weather condition , hard coded at the moment
fetch(
  ("https://api.openweathermap.org/data/2.5/weather?q=" + lat) &
    (lon + "&APPID=f143fe1fd933ca340292950f394916e2&units=imperial")
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    const current = response;
    // console.log(response);
    displayWeather(current, currentElement);
  });

function displayWeather(weatherObject, weatherElement) {
  // var iconUrl = "http://openweathermap.org/img/w/" + weatherObject.weather[0].icon + ".png";
  weatherElement.innerHTML =
    weatherObject.dt_txt || new Date().toLocaleDateString(); //No date, grab current date off of Local
  weatherElement.innerHTML += "<br>";
  weatherElement.innerHTML += "Temp: " + weatherObject.main.temp + " °F";
  weatherElement.innerHTML += "<br>";
  weatherElement.innerHTML += "Wind: " + weatherObject.wind.speed + " MPH";
  weatherElement.innerHTML += "<br>";
  weatherElement.innerHTML += "Humidity " + weatherObject.main.humidity + "%";
  // weatherElement.innerHTML +="<br>";
  // weatherElement.innerHTML += `<img src="${iconUrl}">`;
}
