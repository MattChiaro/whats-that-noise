//housekeeping

const aTgFdFgW = "EBLlYPmsJS0INYOanmR3K7FG7BKYE1eg"; //ticketmaster key
const RfGyArBH = 'f143fe1fd933ca340292950f394916e2'; //openweather key
const city = "Chicago";
const currentDay = dayjs();
const endOfDay = currentDay.endOf("day").format();
const currentDayAndTime = dayjs().format();




const currentElement = document.getElementById("weatherinfo");

// fetch geo coordinates

fetch(
  `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${RfGyArBH}`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (lat_lon) {
    // console.log(lat_lon);
    const lat = lat_lon[0].lat;
    const lon = lat_lon[0].lon;
    const state = lat_lon[0].state;

    var geo =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${RfGyArBH}`;

    // fetch current weather condition , hard coded at the moment
    fetch(geo)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        const current = response;
        console.log(response);
        displayWeather(current, currentElement);
      });
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

//fetch ticketmaster API
const ticketmasterApi = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&segmentName=music&startDateTime=${currentDayAndTime}&endDateTime=${endOfDay}&size=40&sort=date,asc&apikey=${aTgFdFgW}`;

fetch(ticketmasterApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

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
