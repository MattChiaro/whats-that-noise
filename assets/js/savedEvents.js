$(document).ready(function () {
    $('.collapsible').collapsible();
});





// console.log(JSON.parse(localStorage.getItem("savedEvents")))
var theSavedEvents = JSON.parse(localStorage.getItem("savedEvents"))


const ulForSaved =  document.getElementById("savedeventsbox")
const ulForSaved2 =  document.getElementById("savedeventsbox2")

let number = 0




function generateSaved() {
for (let i = 0; i < theSavedEvents.length/2; i++) {
    const liForSaved = document.createElement("li")
// const divForName = document.createElement("div")
// const iForName = document.createElement("i")
// const spanForName = document.createElement("span")
number = i
liForSaved.innerHTML = `
<div class="collapsible-header"><h5>${theSavedEvents[i].name}</h5></div>
<div class="collapsible-body"><span>Date: ${theSavedEvents[i].date} Time: ${theSavedEvents[i].time} Venue: ${theSavedEvents[i].venue} Address: ${theSavedEvents[i].address}   <a href="${theSavedEvents[i].url}" target="_blank" class="waves-effect waves-green btn">Get Tickets</a></span></div>
<div class = "divider"></div>
`
ulForSaved.appendChild(liForSaved)
}   
console.log(number);

for (let i = number + 1; i < theSavedEvents.length; i++) {
    const liForSaved = document.createElement("li")


    liForSaved.innerHTML =`
    <div class="collapsible-header"><h5>${theSavedEvents[i].name}</h5></div>
    <div class="collapsible-body"><span>Date: ${theSavedEvents[i].date} Time: ${theSavedEvents[i].time} Venue: ${theSavedEvents[i].venue} Address: ${theSavedEvents[i].address}   <a href="${theSavedEvents[i].url}" target="_blank" class="waves-effect waves-green btn">Get Tickets</a></span></div>
    <div class = "divider"></div>
    `
ulForSaved2.appendChild(liForSaved)


}   
    
}

generateSaved();

