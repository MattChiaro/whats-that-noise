//housekeeping

const searchInput = document.querySelector("#search-input");
const aTgFdFgW = "EBLlYPmsJS0INYOanmR3K7FG7BKYE1eg"; //ticketmaster key
const RfGyArBH = 'f143fe1fd933ca340292950f394916e2'; //openweather key
const currentDay = dayjs();
const endOfDay = currentDay.endOf("day").format();
const currentDayAndTime = dayjs().format();
const currentWeatherEl = document.getElementById("weatherinfo");
const listedEventsEl = document.getElementById("listed-events");

function fetchWeather(city) {
    const geoApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${RfGyArBH}`
    fetch(geoApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (lat_lon) {
            const lat = lat_lon[0].lat;
            const lon = lat_lon[0].lon;

            const currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${RfGyArBH}`;

            // fetch current weather condition for city
            fetch(currentWeatherApi)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    const currentWeatherArray = response;
                    displayWeather(currentWeatherArray, city);
                });
        });
}

function displayWeather(currentWeatherArray, city) {
    var iconUrl = `https://openweathermap.org/img/w/${currentWeatherArray.weather[0].icon}.png`;
    document.querySelector('#current-weather-title').textContent = `Current weather in ${city}:`;
    currentWeatherEl.innerHTML = `<p>${currentWeatherArray.dt_txt || new Date().toLocaleDateString()}</p>
<p>Temp: ${currentWeatherArray.main.temp} °F</p>
<p>Wind: ${currentWeatherArray.wind.speed} MPH</p>
<p>Humidity: ${currentWeatherArray.main.humidity}%</p>
<img src="${iconUrl}">`
}

function displayEvents(eventsArray) {
    listedEventsEl.innerHTML = ""; //clear the list (in case of multiple searches)

    for (let i = 0; i < eventsArray.length; i++) { 
        const eventLiEl = document.createElement("li")
        const eventDate = dayjs(eventsArray[i].dates.start.dateTime).format("M/D");
        const eventTime = dayjs(eventsArray[i].dates.start.dateTime).format("h:mm A");

        eventLiEl.className = "collection-item avatar";
        eventLiEl.setAttribute("id", "event-list-item");

        eventLiEl.innerHTML = `
            <img src="${eventsArray[i].images[0].url}" alt="artist image" class="circle">
            <span class="title">${eventsArray[i].name}</span>
            <p>${eventsArray[i]._embedded.venues[0].name}</p>
            <p>${eventDate} // ${eventTime} </p>
            <a href="#!" class="secondary-content"><i class="material-icons">Expand</i></a>`

        listedEventsEl.appendChild(eventLiEl);


        // console.log(eventsArray[i].name); //event name
        // console.log(eventsArray[i]._embedded.venues[0].name); //venue name
        // console.log(eventsArray[i]._embedded.venues[0].address.line1); //venue address
        // console.log(eventsArray[i].images[0].url); //artist image
        // console.log(eventsArray[i].url); //ticket url
        // console.log(dayjs(eventsArray[i].dates.start.dateTime).format("M/D")); //date
        // console.log(dayjs(eventsArray[i].dates.start.dateTime).format("h:mm A")); //time
    }
};

function fetchTicketmaster(city) {
    //fetch ticketmaster API
    const ticketmasterApi = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&segmentName=music&startDateTime=${currentDayAndTime}&endDateTime=${endOfDay}&size=40&sort=date,asc&apikey=${aTgFdFgW}`;

    fetch(ticketmasterApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const eventsArray = data._embedded.events;
            displayEvents(eventsArray);
        })

}

function searchCity() {

    let city = searchInput.value.trim()

    fetchWeather(city);
    fetchTicketmaster(city);
}



const searchButton = document.querySelector("#search-button")

searchButton.addEventListener("click", searchCity);


