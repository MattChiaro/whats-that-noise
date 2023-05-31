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
        .then(function (data) {
            console.log(data);
        })
