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

    //Fetchar API med program

    fetch(url)
        .then(response => response.json())
        .then(data => displayChannels(data.channels))
        .catch(error => console.log(error));
}
//Funktion som med hjälp av datan som har hämtats av API:n skriver ut kanalerna i li format till en ul som sedan radas upp på vänstersidan av index.html filen
function displayChannels(channels) {

    channels.forEach(channel => {
        const navUlEl = document.getElementById("mainnavlist")


        //Utskrift ska se ut som liknande: <ul><li>kanal1</li><li>kanal2</li></ul> osv.
        let newLiEl = document.createElement("li");
        let newLiText = document.createTextNode(channel.name);

        // Lägger till eventListener till när muspekaren är över en av kanalerna, då ska funktionen getChannelDesc köras

        newLiEl.addEventListener("click", function () {
            getChannelDesc(channel.id);
        });

        // Appendar både texten (utskrift av kanal i textformat) och li elementet till unordered listan.
        newLiEl.appendChild(newLiText);
        navUlEl.appendChild(newLiEl);

    });
}



// Funktion som med hjälp av id:n som kommer när man aktiverar eventlistenern tar fram tablån för kanalen som har blivit klickad på.

function getChannelDesc(id) {
    const url = 'https://api.sr.se/api/v2/scheduledepisodes?format=json&channelid=' + id + '&size=999';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayChannelDesc(data.schedule);
        })
        .catch(error => console.log(error));
}

//Funktion som med hjälp av datan vi får av den andra API:n hämtar tablån för de olika kanalerna

function displayChannelDesc(schedule) {
    const articleEl = document.getElementById("info");

    articleEl.innerHTML = "";

    const currentTime = new Date();
    if (schedule.length > 0) {
        schedule.forEach(item => {

            const episodeTime = new Date(parseInt(item.starttimeutc.substr(6)));

            if (episodeTime > currentTime) {

                let newArticleEl = document.createElement("article");
                let newTitleEl = document.createElement("h3");
                let newTitleText = document.createTextNode(item.title);
                newTitleEl.appendChild(newTitleText);

                let newTimeEl = document.createElement("h5");
                let newTimeText = document.createTextNode(convertTime(item.starttimeutc, item.endtimeutc));
                newTimeEl.appendChild(newTimeText);

                let newDescriptionEl = document.createElement("p");
                let newDescriptionText = document.createTextNode(item.description);
                newDescriptionEl.appendChild(newDescriptionText);

                newArticleEl.appendChild(newTitleEl);
                newArticleEl.appendChild(newTimeEl);
                newArticleEl.appendChild(newDescriptionEl);

                articleEl.appendChild(newArticleEl);
            }
        });
    }
    else {
        articleEl.innerHTML = "<p>Denna radiokanalen sänder för nuvarande inga episoder.</p>";
    }

}

// Funktion som konverterar tid till CET (vår lokala tid)

function convertTime(timeStringStart, timeStringEnd) {
    let tempTimeStart = new Date(parseInt(timeStringStart.substr(6)));
    let tempTimeEnd = new Date(parseInt(timeStringEnd.substr(6)));

    let hoursStart = tempTimeStart.getHours();
    let minutesStart = tempTimeStart.getMinutes();

    if (hoursStart < 10) { hoursStart = "0" + hoursStart; }
    if (minutesStart < 10) { minutesStart = "0" + minutesStart; }

    let fixedTimeStart = hoursStart + ":" + minutesStart;


    let hoursEnd = tempTimeEnd.getHours();
    let minutesEnd = tempTimeEnd.getMinutes();

    if (hoursEnd < 10) { hoursEnd = "0" + hoursEnd; }
    if (minutesEnd < 10) { minutesEnd = "0" + minutesEnd; }

    let fixedTimeEnd = hoursEnd + ":" + minutesEnd;


    let fixedTime = fixedTimeStart + " - " + fixedTimeEnd;

    return fixedTime;
}





