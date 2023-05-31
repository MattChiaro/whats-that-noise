const aTgFdFgW = 'EBLlYPmsJS0INYOanmR3K7FG7BKYE1eg' //key
const city = 'Chicago';
const currentDay = dayjs();
const endOfDay = currentDay.endOf('day').format()
const currentDayAndTime = dayjs().format();

//fetch ticketmaster API
const ticketmasterApi = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&segmentName=music&startDateTime=${currentDayAndTime}&endDateTime=${endOfDay}&size=40&sort=date,asc&apikey=${aTgFdFgW}`;
fetch(ticketmasterApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {;
            console.log(data);
            

            const eventsArray = data._embedded.events;
            for (let i = 0; i < eventsArray.length; i++) {

                console.log(eventsArray[i].name); //event name
                console.log(eventsArray[i]._embedded.venues[0].name) //venue name
                console.log(eventsArray[i]._embedded.venues[0].address.line1) //venue address
                console.log(eventsArray[i].images[0].url) //artist image
                console.log(eventsArray[i].url) //ticket url
                console.log(dayjs(eventsArray[i].dates.start.dateTime).format('M/D')) //date

                console.log(dayjs(eventsArray[i].dates.start.dateTime).format('h:mm A')) //time
                
            }
        })
