"use strict";

const url = "https://uppgift2-1.onrender.com/api/workexperience";

document.addEventListener("DOMContentLoaded", () => {
    getData();
});

async function getData() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const workexperienceContainer = document.getElementById("workexperienceContainer");

        //Loopa igenom datan och skapa article- element för varje jobberfrenhet
        data.forEach(workexperience => {
            const article = document.createElement("article");
            article.innerHTML = `
            <h2>${workexperience.companyname}</h2>
            <p><strong>Jobbtitel:</strong> ${workexperience.jobtitle}</p>
            <p><strong>Plats:</strong> ${workexperience.location}</p>
            <p><strong></strong> ${workexperience.startdate}</p>
            <p><strong></strong> ${workexperience.enddate}</p>
            <p><strong></strong> ${workexperience.description}</p>
            `;
            workexperienceContainer.appendChild(article);
        });
    } catch (error) {
        console.error("Något gick fel: ", error);
    }
}