document.getElementById("button").addEventListener("click", fetchData);

//fetches data from liturgical calendar api
async function fetchData() {
    try {
        var text = document.getElementById("dateBox").value;
        const response = await fetch(`http://calapi.inadiutorium.cz/api/v0/en/calendars/default/${text}`)
        const data = await response.json();
        printDataToPage(data);
    }
    catch (e) {
        printError();
    }
}

//prints data for the specified liturgical calendar day to the page
function printDataToPage(data) {
    var celebrations = data.celebrations;
    var celebrationHTML = "";
    celebrations.forEach(element => {
        celebrationHTML += `
        <h4>${element.title}</h4>
        <p>Color: ${element.colour}</p>
        `;
    });

    document.getElementById("date").innerHTML = `
    <p>Date: ${data.date}</p>
    <p>Season: ${data.season}</p>
    <p>Week: ${data.season_week}</p>
    <br>
    <h3>Celebrations:</h3>
    <br>
    ${celebrationHTML}
    `
}

function printError() {
    document.getElementById("date").innerHTML = `<h2 style="color: red">Error! Date is invalid or API is malfunctioning.</h2>`
}


