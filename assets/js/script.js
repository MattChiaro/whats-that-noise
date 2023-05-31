//housekeeping

const searchInput = document.querySelector("#search-input");
const aTgFdFgW = "EBLlYPmsJS0INYOanmR3K7FG7BKYE1eg"; //ticketmaster key
const RfGyArBH = 'f143fe1fd933ca340292950f394916e2'; //openweather key
const currentDay = dayjs();
const endOfDay = currentDay.endOf("day").format();
const currentDayAndTime = dayjs().format();
const currentElement = document.getElementById("weatherinfo");
let city = "";
// fetch geo coordinates

function searchCity() {
    city = searchInput.value.trim()

    const geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${RfGyArBH}`

    fetch(geoApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (lat_lon) {
            const lat = lat_lon[0].lat;
            const lon = lat_lon[0].lon;

            const currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${RfGyArBH}`;

            // fetch current weather condition , hard coded at the moment
            fetch(currentWeatherApi)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    const current = response;
                    console.log(current);
                    displayWeather(current, currentElement);
                });
        });

    function displayWeather(weatherObject, weatherElement) {
        var iconUrl = `http://openweathermap.org/img/w/${weatherObject.weather[0].icon}.png`;
        document.querySelector('#current-weather-title').textContent = `Current weather in ${city}:`;
        weatherElement.innerHTML = `<p>${weatherObject.dt_txt || new Date().toLocaleDateString()}</p>
  <p>Temp: ${weatherObject.main.temp} °F</p>
  <p>Wind: ${weatherObject.wind.speed} MPH</p>
  <p>Humidity: ${weatherObject.main.humidity}%</p>
  <img src="${iconUrl}">`
    }

    //fetch ticketmaster API
    const ticketmasterApi = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&segmentName=music&startDateTime=${currentDayAndTime}&endDateTime=${endOfDay}&size=40&sort=date,asc&apikey=${aTgFdFgW}`;

    fetch(ticketmasterApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data); //log returned api 

            const eventsArray = data._embedded.events;
            for (let i = 0; i < eventsArray.length; i++) {
                console.log(eventsArray[i].name); //event name
                console.log(eventsArray[i]._embedded.venues[0].name); //venue name
                console.log(eventsArray[i]._embedded.venues[0].address.line1); //venue address
                console.log(eventsArray[i].images[0].url); //artist image
                console.log(eventsArray[i].url); //ticket url
                console.log(dayjs(eventsArray[i].dates.start.dateTime).format("M/D")); //date
                console.log(dayjs(eventsArray[i].dates.start.dateTime).format("h:mm A")); //time
            }
        });
}

document.querySelector("#search-button").addEventListener("click", searchCity);


$(document).ready(function () {
    $('.collapsible').collapsible();
});