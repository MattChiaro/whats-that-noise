$(document).ready(function () {
    $('.collapsible').collapsible();
});





// console.log(JSON.parse(localStorage.getItem("savedEvents")))
var theSavedEvents = JSON.parse(localStorage.getItem("savedEvents"))


const ulForSaved = document.getElementById("savedeventsbox")
const ulForSaved2 = document.getElementById("savedeventsbox2")

let number = 0




function generateSaved() {
    for (let i = 0; i < theSavedEvents.length / 2; i++) {
        const liForSaved = document.createElement("li")
        // const divForName = document.createElement("div")
        // const iForName = document.createElement("i")
        // const spanForName = document.createElement("span")
        number = i
        liForSaved.innerHTML = `
    <div class="collapsible-header font1" ><h5>${theSavedEvents[i].name}</h5></div>
    <div class="collapsible-body font2"><span>Date: ${theSavedEvents[i].date} <br> Time: ${theSavedEvents[i].time} <br>  Venue: ${theSavedEvents[i].venue} <br>  Address: ${theSavedEvents[i].address}  <br>  <a href="${theSavedEvents[i].url}" target="_blank" class="cyan waves-effect waves-green btn">Get Tickets</a></span> <a class="cyan trash waves-effect waves-light btn del" id=${i}>🗑️</a></div>
    <div class = "divider"></div>
`
        ulForSaved.appendChild(liForSaved)
    }
    console.log(number);

    for (let i = number + 1; i < theSavedEvents.length; i++) {
        const liForSaved = document.createElement("li")


        liForSaved.innerHTML = `
    <div class="collapsible-header font1"><h5>${theSavedEvents[i].name}</h5></div>
    <div class="collapsible-body font2"><span>Date: ${theSavedEvents[i].date} <br> Time: ${theSavedEvents[i].time} <br>  Venue: ${theSavedEvents[i].venue} <br>  Address: ${theSavedEvents[i].address}        <br> <a href="${theSavedEvents[i].url}" target="_blank" class="cyan waves-effect waves-green btn">Get Tickets</a></span> <a class="cyan trash waves-effect waves-light btn del" id=${i}>🗑️</a>
    </div>
    <div class = "divider"></div>
    `
        ulForSaved2.appendChild(liForSaved)


    }

}


function removeSaved(e) {
    if (e.target.matches(".del")) {
        console.log(parseInt(e.target.id));
        console.log(theSavedEvents);

        var newEvents = theSavedEvents.filter(function (el, i) {
            return i != e.target.id;
        })
        console.log(newEvents);
        localStorage.setItem("savedEvents", JSON.stringify(newEvents))
        window.location.reload();
    }

}


generateSaved();

document.querySelector(".saved-row").addEventListener("click", removeSaved);