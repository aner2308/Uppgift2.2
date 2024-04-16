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
            article.dataset.id = workexperience.id; //Ger articlen samma ID som jobberfarenheten
            article.innerHTML = `
            <h2>${workexperience.companyname}</h2>
            <p><strong>Jobbtitel:</strong> ${workexperience.jobtitle}</p>
            <p><strong>Plats:</strong> ${workexperience.location}</p>
            <p><strong></strong> ${workexperience.startdate}</p>
            <p><strong></strong> ${workexperience.enddate}</p>
            <p><strong></strong> ${workexperience.description}</p>
            <button class="deleteBtn">Radera</button>
            `;
            workexperienceContainer.appendChild(article);

            //Lägger till eventListener för delete knappen i articlen
            const deleteBtn = article.querySelector(".deleteBtn");
            deleteBtn.addEventListener("click", () => deleteWorkexperience(workexperience.id));
        });
    } catch (error) {
        console.error("Något gick fel: ", error);
    }
}

async function deleteWorkexperience(id) {
    try {
        const deleteUrl = `${url}/${id}`;
        const response = await fetch(deleteUrl, {
            method: "DELETE"
        });

        if (response.ok) {
            // Remove the article from the DOM
            const articleToDelete = document.querySelector(`article[data-id="${id}"]`);
            if (articleToDelete) {
                articleToDelete.remove();
                console.log(`Jobberfarenhet med id ${id} har raderats`);
            } else {
                console.error(`Kunde inte hitta article med id ${id} i DOM:en.`);
            }
        } else {
            throw new Error(`Fel vid radering av jobberfarenhet med id ${id}.`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}