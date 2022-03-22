'use strict';
// constant to api url
const apiurl = "https://ghibliapi.herokuapp.com/films";

let apiQuery;
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', getData);

//function for fetching data
function getData() {
    apiQuery = apiurl;
    console.log("Sent query" + apiQuery);
    doSearch(apiQuery);
}

function doSearch(apiQuery) {
    // suoritetaan hakukysely, fetch hoitaa mahdolliset tietoliikenneongelmat.
    fetch(apiQuery).then(function (response) {
        return response.json();
    }).then(function (json) {
        showAnswer(json);				// siirrytään varsinaisen datan käsittelyyn --> tämä funktio hoitaa datan käsittelyn
    }).catch(function (error) {           // Jos tapahtuu virhe,
        console.log(error);             // kirjoitetaan virhe konsoliin.
    });
}

let showAnswer = (jsonData) => {
    //loggin answer table to console
    console.log("JSON table:");
    console.log(jsonData);

    const section = document.getElementById("searchResults");
    //emptying main before adding search results, if user makes several searches.
    section.innerHTML = "";
    let imgAdd;

    for (let i = 0; i < jsonData.length; i++) {
        // if image picture is not found, change picture to notfound.jpg
        try {
            imgAdd = jsonData[i].image;
        } catch(error){
            imgAdd="notfound.JPG";
        }

        section.innerHTML += `<article id="ghibli">
        <h2>${jsonData[i].title}</h2>
        <img src=${imgAdd} alt="title" width="200" height="auto">
        <p id="pGhibli">${jsonData[i].description}</p>
        <pid="pGhibli">Release date: ${jsonData[i].release_date}<p/>
        </article>`
    }

}

