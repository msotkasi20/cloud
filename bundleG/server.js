// Luodaan node.js web-kehys express
const express = require ('express');

// Luodaan express-sovellus, jossa express() luo uuden sovelluksen
// ja app on palvelin
const app = express();

// Määritellään reitti (route)
app.get('/', (req, res) => {
    res.send('Hello World from Render, again!');
});

// Määritetään käytettävä portti, 3000 on localhost portti
const PORT = process.env.PORT || 3000

// Käynnistetään palvelin ja tulostetaan viesti terminaaliin testiksi
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

