const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const cheerio = require("cheerio"); // 👈 Uusi kirjasto HTML:n käsittelyyn
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(cors());
 
app.get("/tapahtumat", async (req, res) => {
    const nyt = new Date();
    const kuukausi = nyt.getMonth() + 1;
    const paiva = nyt.getDate();
 
    // Muodostetaan otsikko Wikipedia-sivulle, esim. "23._huhtikuuta"
    const url = `https://fi.wikipedia.org/api/rest_v1/page/summary/${paiva}_${kuukausi}`; 
    try {
        const vastaus = await fetch(url);
        const data = await vastaus.json();
 
        if (!data || !data.extract) {
            return res.json({ tapahtumat: ["Ei löytynyt tapahtumia."] });
        }
 
        res.json({ tapahtumat: [data.extract] });
    } catch (err) {
        console.error("Virhe:", err);
        res.status(500).json({ error: "Virhe haettaessa tietoa." });
    }
});
 
app.listen(PORT, () => {
    console.log(`Palvelin käynnissä portissa ${PORT}`);
});