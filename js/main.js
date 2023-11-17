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

    //Fetchar API om kanaler

    fetch(url)
        .then(response => response.json())
        .then(data => displayChannels(data.channels))
        .catch(error => console.log(error));
}

// Skriver ut kanaler till vänstra sidan av index.html

function displayChannels(channels) {

    channels.forEach(channel => {
        const navUlEl = document.getElementById("mainnavlist")


        //Utskrift ska se ut som liknande: <li>test</li>

        let newLiEl = document.createElement("li");
        let newLiText = document.createTextNode(channel.name);
        // Lägger till eventListener till när muspekaren är över en av kanalerna, då ska funktionen displayChannelsDesc köras

        newLiEl.addEventListener("click", function () {
            displayChannelDesc(channel.id);
        });

//Appendar de tidigare element jag skapat med de nya textnoderna

        newLiEl.appendChild(newLiText);
        navUlEl.appendChild(newLiEl);

    });
}

// Funktion som tar idn från kanalen och i sin tur skriver ut tablån för kanalen när man klickar på kanalen i listan

function displayChannelDesc(id) {
    const url = 'https://api.sr.se/api/v2/scheduledepisodes?format=json&channelid=' + id;

    fetch(url)
        .then(response => response.json())
        .then(data => data.schedules)            // Hur ska jag spara datan? Det som är problemet.
        .catch(error => console.log(error));

    // Utskrivningsformat: <article> <h3>Titel på program</h3><h5>Start- och sluttid för programmet</h5><p>Beskrivning</p></article>



// Gjorde denna delen av koden till kommentar då jag antagligen kommer använda dessa rader när jag får rätt på själva funktionen med id osv.


    /*let newArticleEl = document.createElement("article");
    let newTitleEl = document.createElement("h3");
    let newTitleText = document.createTextNode(schedule.title);
    newTitleEl.appendChild(newTitleText);
    let newDescriptionEl = document.createElement("p");
    let newDescriptionText = document.createTextNode(schedule.description);
    newDescriptionEl.appendChild(newDescriptionText);
    let newTimeEl = document.createElement("h5");
    let newTimeText = document.createTextNode(schedule.starttimeutc, schedule.endtimeutc);
    newTimeEl.appendChild(newTimeText);

    newArticleEl.appendChild(newTitleEl);
    newArticleEl.appendChild(newDescriptionEl);
    newArticleEl.appendChild(newTimeEl);

    articleEl.appendChild(newArticleEl)*/

}


//BYT TIILL HTTPS INNAN INLÄMNING!


