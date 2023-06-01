//housekeeping
const searchInput = document.querySelector("#search-input");
const aTgFdFgW = "EBLlYPmsJS0INYOanmR3K7FG7BKYE1eg"; //ticketmaster key
const RfGyArBH = 'f143fe1fd933ca340292950f394916e2'; //openweather key
const dateInput = document.querySelector("#date-selector");

dateInput.value = dayjs().format('M/D/YY'); //set date input to current day

const currentWeatherEl = document.getElementById("weatherinfo");
const listedEventsEl = document.getElementById("listed-events");


$(document).ready(function () { //modal and datepicker initialization
    $('.modal').modal();
    $('.datepicker').datepicker({
        onSelect: function (selectedDate) {
            dateInput.value = dayjs(selectedDate).format('M/D/YY') //when date is selected, fill the input form
        }
    })
});


function fetchWeather(city) { //fetch weather data from openweather
    const geoApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${RfGyArBH}`
    fetch(geoApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (lat_lon) { //turn string into lat/lon coords
            const lat = lat_lon[0].lat;
            const lon = lat_lon[0].lon;

            const currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${RfGyArBH}`; //use lat and lon to fetch current weather

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

function displayWeather(currentWeatherArray, city) { //display dynamically
    var iconUrl = `https://openweathermap.org/img/w/${currentWeatherArray.weather[0].icon}.png`;
    document.querySelector('#current-weather-title').textContent = `Current weather in ${city}:`;
    currentWeatherEl.innerHTML = `<p>${currentWeatherArray.dt_txt || new Date().toLocaleDateString()}</p>
<p>Temp: ${currentWeatherArray.main.temp} °F</p>
<p>Wind: ${currentWeatherArray.wind.speed} MPH</p>
<p>Humidity: ${currentWeatherArray.main.humidity}%</p>
<img src="${iconUrl}">`
}
var eArray = [];

function displayEvents(eventsArray) {
    listedEventsEl.innerHTML = ""; //clear the list (in case of multiple searches)
    eArray = eventsArray;
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
            <button href="#modal1" id=${i} class="secondary-content modal-trigger btn" >More Info</button>`

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


    let endOfDay = dayjs(dateInput.value).endOf("day").format();
    let selectedDayAndTime = dayjs(dateInput.value).format();

    //fetch ticketmaster API
    const ticketmasterApi = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&segmentName=music&startDateTime=${selectedDayAndTime}&endDateTime=${endOfDay}&size=40&sort=date,asc&apikey=${aTgFdFgW}`;

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

function moreInfo(selectedEvent,i) { //display modal with details from event clicked

    document.querySelector('#modal1').innerHTML = `<div class="modal-content">
    <h4 id="modal-header">${selectedEvent.name}</h4>
    <p><i>Venue: </i>${selectedEvent._embedded.venues[0].name}</p>
    <p><i>${selectedEvent._embedded.venues[0].address.line1}</i></p>
    <p><i>Date: </i>${dayjs(selectedEvent.dates.start.dateTime).format("M/D/YY")} - ${dayjs(selectedEvent.dates.start.dateTime).format("h:mm A")} </p>
  </div>
  <div class="modal-footer">
  <button id="save-event-${i}" class="waves-effect waves-green btn">Save Event</button>
  <a href="${selectedEvent.url}" target="_blank" class="waves-effect waves-green btn">Get Tickets</a>
    <a href="#!" class="modal-close waves-effect waves-green btn">Close</a>
  </div>`
}

listedEventsEl.addEventListener("click", function (event) { //listen for clicks on each event in the list
    for (let i = 0; i < eArray.length; i++) {
        if (i == event.target.id) {
            moreInfo(eArray[i],i);
        }

    }
})

document.querySelector("#modal1").addEventListener("click", function (event) { //listen for clicks on save event button
    const idArray = event.target.id.split("-")
    const i = idArray[2]
    saveEvent(eArray, i)


    ;
})

function saveEvent(eArray, i) { //save event to local storage
    console.log("eArray", eArray[i])

    const event = {
        name: `${eArray[i].name}`,
    venue: `${eArray[i]._embedded.venues[0].name}`,
    address: `${eArray[i]._embedded.venues[0].address.line1}`,
    date: `${dayjs(eArray[i].dates.start.dateTime).format("M/D/YY")}`,
    time: `${dayjs(eArray[i].dates.start.dateTime).format("h:mm A")}`,
    url: `${eArray[i].url}`
    }

    localStorage.setItem(`event${i}`, JSON.stringify(event));
    

}

