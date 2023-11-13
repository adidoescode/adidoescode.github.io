// Lösning av moment 5, Sveriges Radio API löst av Adam Sjögren

"use strict";

/*  Delar till ej obligatorisk funktionalitet, som kan ge poäng för högre betyg
*   Radera rader för funktioner du vill visa på webbsidan. */
document.getElementById("player").style.display = "none";      // Radera denna rad för att visa musikspelare
document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

/* Här under börjar du skriva din JavaScript-kod */

let mainNavEl = document.getElementById("mainnav");
let mainNavListEl = document.getElementById("mainnavlist")

/* Funktion som aktiveras när man laddar upp hemsidan*/

window.onload = init;

function init() {
    getChannels();
}

function getChannels() {
    const url = "http://api.sr.se/api/v2/channels/?format=json";

    //Fetchar API

    fetch(url)
        .then(response => response.json())
        .then(data => displayChannels(data))
        .catch(error => console.log(error));
}


// Onclick visar programtablå för aktuella kanalen med start på kanalen fram till midnatt



// 

