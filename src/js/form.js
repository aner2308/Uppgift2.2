"use strict";


let url = "https://uppgift2-1.onrender.com/api/workexperience";

//Länkar till knappen i formulär och lägger på event listener
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", submitForm)

//Funktion för att lägga till data till API/server från formuläret
function submitForm() {
    const form = document.getElementById("workexperienceForm");
    const formData = new FormData(form);

    //Hämta väg till felmeddelande
    const errorMsgEl = document.getElementById("errorMsg");

    //Hämtar värdena från formulärets olika inputfält
    const companyname = formData.get("companyname");
    const jobtitle = formData.get("jobtitle");
    const location = formData.get("location");
    const startdate = formData.get("startdate");
    const enddate = formData.get("enddate");
    const description = formData.get("description");

    //Felmeddelande om något av de obligatoriska fälten inte är ifyllda
    if (!companyname.trim() || !jobtitle.trim() || !location.trim() || !startdate.trim() || !description.trim()) {
        errorMsgEl.innerText = "*Vänligen fyll i alla obligatoriska fält.";
        return;
    } else {
        errorMsgEl.innerText = ""; // Töm felmeddelandet om alla fält är ifyllda korrekt
    }

    //Använder formulärdatan och kör den i funktionen createWorkexperience
    createWorkexperience(companyname, jobtitle, location, startdate, enddate, description);

    //rensar formuläret vid lyckat anrop
    form.reset();
}

//Skapa ny jobberfarenhet
async function createWorkexperience(companyname, jobtitle, location, startdate, enddate, description) {
    let workexperience = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    }

    const response = await fetch(url, {

        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(workexperience)
    })

    const data = await response.json();
    console.log(data);

}