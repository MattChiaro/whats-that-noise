$(document).ready(function () {
    $('.collapsible').collapsible();
});

console.log(localStorage.getItem("event2" , "name"))
const event2 = localStorage.getItem("event2");
console.log(event2.name);

const ulForSaved =  document.getElementById("savedeventsbox")
console.log(localStorage.getItem("event2"));


const liForSaved = document.createElement("li")
ulForSaved.innerHTML = ""
liForSaved.innerHTML = `
<div class="collapsible-header"><i class="material-icons"</i></div>

`
ulForSaved.appendChild(liForSaved)

//`<span class="title">${eventsArray[i].name}</span>