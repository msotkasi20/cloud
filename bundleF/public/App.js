document.getElementById("hae").addEventListener("click", async () => {
    try {
        const response = await fetch("https://historia-backend-7tvi.onrender.com/tapahtumat");
        const data = await response.json();
        document.getElementById("tulokset").innerHTML = data.tapahtumat;
    } catch (error) {
        console.error("Virhe haettaessa tapahtumia", error);
    }
});
