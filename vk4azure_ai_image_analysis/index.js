require('dotenv').config(); //lataa env. tiedoston jotta saadaan API-avain ja endpointit käyttöön

const axios = require('axios'); //HTTP-pyynnöt
const fs = require('fs'); //Tiedostojen lukeminen
const path = require('path'); //Polkujen käsittely

const subscriptionKey = process.env.AZURE_KEY; //API-avaimen haku .env:stä
const endpoint = process.env.AZURE_ENDPOINT; //Endpointin haku .env:stä

//Määritellään kuvan polku
const imagePath = path.join(__dirname, 'kuva.jpg'); //Varmista, että kuva on tässä hakemistossa

//Luentaan kuva tiedostojärjestelmästä
const imageData = fs.readFileSync(imagePath);

//URL-johon lähetämme kuvan
const url = `${endpoint}/vision/v3.2/analyze`;

//Parametrit, mitä ominaisuuksia haluamme analysoida
const params = {
    visualFeatures: 'Description,Tags,Objects',
};

//Tehdään HTTP-pyyntö axios kirjaston avulla, 
//lähetetään kuva ja määritetään pyyntöön myös otsikot jotka sisältävät API-avaimen
const headers = {
    'Ocp-Apim-Subscription-Key': subscriptionKey, //Azure API-avaimen lisäys
    'Content-Type': 'application/octet-stream', //Lähetetään kuva binäärimuodossa
};

//Lähetetään kuva Azurelle
axios
    // Lähetetään POST pyyntö Azurelle, jossa mukana on kuvan data ja määritellyt parametrit
    .post(url, imageData, { headers: headers, params: params })
    // Jos Azure vastaa onnistuneesti,tulostamme saamamme analyysin
    .then(response => {
        //tulostetaan Azurelta saatu vastaus
        console.log('Analyysitulokset: ');
        console.dir(response.data, {depth: null});
    })
    // Jos tulee virhe, tulostmme virheviestin
    .catch(error => {
        console.error('Virhe API-kutsussa: ', error.message);
    });