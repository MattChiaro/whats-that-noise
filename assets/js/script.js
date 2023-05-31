const currentElement = document.getElementById("weatherinfo");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=chicago&APPID=f143fe1fd933ca340292950f394916e2&units=imperial"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    const current = response;
    console.log(response);
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
