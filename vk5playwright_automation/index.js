const {chromium} = require('playwright');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

//funktio, joka hakee tietoja ravintoloiden nettisivuilta
async function fetchMultipleLunchData() {
    const urls = [
        'https://fi.jamix.cloud/apps/menu/?anro=93077&k=49&mt=11',
        'https://fi.jamix.cloud/apps/menu/?anro=93077&k=69&mt=84',
        'https://mealdoo.com/week/uniresta/julinia/ravintolajulinia?theme=light--light-green',
        'https://mealdoo.com/week/uniresta/lipasto/ravintolalipasto?theme=light--light-green'
]

let allLuchData = [];

for (let url of urls) {
    console.log(`Hakeetiedot sivulta: ${url}`);
    allLunchData = allLunchData.concat(lunchData); //Yhdistetään tiedot
}
return allLunchData;
}

//Funktio, joka lähettää sähköpostin
async function sendEmail(lunchData) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            
        }
    })
}
