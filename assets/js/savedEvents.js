$(document).ready(function () {
    $('.collapsible').collapsible();
});

console.log(JSON.parse(localStorage.getItem("savedEvents")))
const event2 = localStorage.getItem("event2");
console.log(Object.value("0"))

const ulForSaved =  document.getElementById("savedeventsbox")
console.log(localStorage.getItem("event2"));


const liForSaved = document.createElement("li")
ulForSaved.innerHTML = ""
liForSaved.innerHTML = `
<div class="collapsible-header"><i class="material-icons"</i></div>

`
ulForSaved.appendChild(liForSaved)

//`<span class="title">${eventsArray[i].name}</span>