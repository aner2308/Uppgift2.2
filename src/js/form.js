"use strict";


let url = "https://uppgift2-1.onrender.com/api/workexperience";
/*
getData();

async function getData() {
    const response = await fetch(url);

    const data = await response.json();

    console.log(data);
}*/

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", submitForm)

//Funktion för att lägga till data till API/server från formuläret
function submitForm() {
    const form = document.getElementById("workexperienceForm");
    const formData = new FormData(form);

    //Hämtar värdena från formulärets olika inputfält
    const companyname = formData.get("companyname");
    const jobtitle = formData.get("jobtitle");
    const location = formData.get("location");
    const startdate = formData.get("startdate");
    const enddate = formData.get("enddate");
    const description = formData.get("description");

    if (!companyname.trim() || !jobtitle.trim() || !location.trim() || !startdate.trim() || !description.trim()) {
        console.log("Här saknas det något...")
        return;
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

async function deleteWorkexperience(id) {
    const deleteUrl = `${url}/${id}`

    fetch(deleteUrl, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Fel vid radering av jobberfarenhet med id ${id}.`);
            }
            console.log(`Jobberfarenhet med id ${id} har raderats`);
        })
        .catch(error => {
            console.error("Fel vid radering:" + error)
        })
}