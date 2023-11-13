// Lösning av moment 5, Sveriges Radio API löst av Adam Sjögren

"use strict";

/*  Delar till ej obligatorisk funktionalitet, som kan ge poäng för högre betyg
*   Radera rader för funktioner du vill visa på webbsidan. */
document.getElementById("player").style.display = "none";      // Radera denna rad för att visa musikspelare
document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

// Funktion som aktiveras när man laddar upp hemsidan

window.onload = init;

function init() {
    getChannels();
}

function getChannels() {
    const url = "http://api.sr.se/api/v2/channels/?format=json";

    //Fetchar API

    fetch(url)
        .then(response => response.json())
        .then(data => displayChannels(data.channels))
        .catch(error => console.log(error));
}
// 
function displayChannels(channels) {

    channels.forEach(channel => {
        const navUlEl = document.getElementById("mainnavlist")

        //Utskrift ska se ut som liknande: <li><a>test</a></li>
        let newLiEl = document.createElement("li");
        let newAEl = document.createElement("a");
        let newLiText = document.createTextNode(channel.name);

        newAEl.appendChild(newLiText);
        newLiEl.appendChild(newAEl);
        navUlEl.appendChild(newLiEl);

    });
}

// Lägger till eventListener till när muspekaren är över en av kanalerna, då ska funktionen displayChannelsDesc köras


// Funktion som tar beskrivningen från varje kanal, och när man hoverar li elementet poppar texten upp


function displayChannelDesc() {
    console.log("hahaha");
}
// Onclick visar programtablå för aktuella kanalen med start på kanalen fram till midnatt


//BYT TIILL HTTPS INNAN INLÄMNING!


