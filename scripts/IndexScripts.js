const ctgSelector = document.querySelector("#category");    //Selection for either deep sky or solar system
const entityMenu = document.querySelector("#entity");   //This is the primary entity type after selecting deep-sky or solar-system
const monthField = document.querySelector("#month");
const nameEntity = document.querySelector("#name-entity");  //This is the secondary name of each element
const deepSkyNames = {
    "comets": [
        {value: "12-pons-brooks", text: "12 Pons Brooks"},
        {value: "2023-a3", text: "2023 A3"},
        {value: "a1", text: "A1"},
        {value: "c2013-x1", text: "C2013 X1"},
        {value: "c2022-e3", text: "C2022 E3"},
        {value: "catalaina", text: "Catalaina"},
        {value: "swan-25f", text: "SWAN 25F"},
        {value: "vomet-nishimora", text: "Vomet Nishimora"}
    ],  
    "exoplanets": [
        {value: "hat-p-10b", text: "HAT-P-10B"},
        {value: "hat-p-25", text: "HAT-P-25"},
        {value: "hat-p-25b", text: "HAT-P-25b"},
        {value: "toi-1168-b", text: "TOI 1168 b"},
        {value: "toi-1168.01", text: "TOI 1168.01"},
        {value: "toi-3604.01", text: "TOI 3604.01"},
        {value: "toi-1858.01", text: "TOI-1858.01"},
        {value: "toi-2431", text: "TOI-2431"},
        {value: "toi-2431.01", text: "TOI-2431.01"},
        {value: "tres-3b", text: "Tres-3b"},
        {value: "wasp-10b", text: "WASP 10b"},
        {value: "wasp-33b", text: "WASP 33b"},
        {value: "wasp-52b", text: "WASP-52b"},
        {value: "xo-1 b", text: "XO-1 b"}
    ],
    "clusters": [
        {value: "m12", text: "M12"},
        {value: "m13", text: "M13"},
        {value: "m15", text: "M15"},
        {value: "m2", text: "M2"},
        {value: "m20", text: "M20"},
        {value: "m22", text: "M22"},
        {value: "m3", text: "M3"},
        {value: "m35", text: "M35"},
        {value: "m4", text: "M4"},
        {value: "m45", text: "M45"},
        {value: "m51", text: "M51"},
        {value: "m7", text: "M7"},
        {value: "m71", text: "M71"},
        {value: "the-beehive-cluster", text: "The Beehive Cluster"}
    ],
    "nebulae": [
        {value: "bubble-nebula", text: "Bubble Nebula"},
        {value: "crescent-nebula", text: "Crescent Nebula"},
        {value: "dumbbell-nebula", text: "Dumbbell Nebula"},
        {value: "filament-nebula", text: "Filament Nebula"},
        {value: "gillyfish", text: "Gillyfish"},
        {value: "heart", text: "Heart"},
        {value: "horse-head", text: "Horse Head"},
        {value: "m1", text: "M1"},
        {value: "m42", text: "M42"},
        {value: "m57", text: "M57"},
        {value: "rosita", text: "Rosita"},
        {value: "the-monkey-head", text: "The Monkey Head"}
    ],
    "stars": [ 
        {value: "ag-lmi", text: "AG LMi"},
        {value: "dl-cmi", text: "DL CMi"},
        {value: "ef4", text: "EF4"},
        {value: "einstein-cross", text: "Einstein Cross"},
        {value: "m67", text: "M67"},
        {value: "rr-lyrae", text: "RR Lyrae"},
        {value: "s-cnc", text: "S Cnc"},
        {value: "t-coronae-borealis", text: "T Coronae Borealis"},
        {value: "t-coronae-v", text: "T Coronae Borealis"},
        {value: "t-crb", text: "T CrB"}
    ],
    "supernovae": [
        {value: "nova-u-sco", text: "Nova U Sco"},
        {value: "sn-supernova", text: "SN Supernova"}
    ],
};
const categoryOptions = {
    "solar-system": [
        {value: "sun", text: "Sun"},
        {value: "moon", text: "Moon"},
        {value: "venus", text: "Venus"},
        {value: "jupiter", text: "Jupiter"},
        {value: "mercury", text: "Mercury"},
        {value: "saturn", text: "Saturn"},
        {value: "mars", text: "Mars"},
        {value: "uranus", text: "Uranus"},
        {value: "neptune", text: "Neptune"},
        {value: "asteroids", text: "Asteroids"},
        {value: "satellite", text: "Satellite"},
    ],
    "deep-sky": [
        {value: "comets", text: "Comets"},
        {value: "exoplanets", text: "Exoplanets"},
        {value: "clusters", text: "Clusters"},
        {value: "nebulae", text: "Nebulae"},
        {value: "stars", text: "Stars"},
        {value: "supernovae", text: "Supernovae"},
    ]
};
ctgSelector.addEventListener("change", function() {   //Event handler for populating the entity list
    const selectedCategory = this.value;
    entityMenu.innerHTML = `<option selected disabled>Select Entity</option>`;
    monthField.style.display = "inline-block";
    if (nameEntity) {
        nameEntity.innerHTML = "";
        nameEntity.style.display = "none";
    }
    if (selectedCategory && categoryOptions[selectedCategory]) {
        categoryOptions[selectedCategory].forEach(item => {
            const option = document.createElement("option");
            option.value = item.value;
            option.textContent = item.text;
            entityMenu.appendChild(option);
        });
        entityMenu.disabled = false;
        if (selectedCategory === "deep-sky") {
            monthField.style.display = "none";
            monthField.required = false;
        }
    } else {
        entityMenu.disabled = true;
    } 
});

entityMenu.addEventListener("change", function() {
    if (ctgSelector.value === "deep-sky" && this.value) {
        if (!nameEntity) {
            createnameEntityContainer();    //Call to another function
        } else {
            nameEntity.style.display = "block";
        }
        const nameSelect = document.createElement("select");
        nameSelect.id = "name";
        nameSelect.name = "name";
        nameSelect.required = true;
        nameSelect.innerHTML = '<option selected disabled>Select Entity Name</option>';
        
        deepSkyNames[this.value].forEach(item => {
            const option = document.createElement("option");
            option.value = item.value;
            option.textContent = item.text;
            nameSelect.appendChild(option);
        });
        nameEntity.innerHTML = "";
        nameEntity.appendChild(nameSelect);
        nameEntity.className = "name-entity-container";
    } else if (nameEntity) {
        nameEntity.style.display = "none";
    }
});

function createnameEntityContainer() {
    const container = document.createElement("div");
    container.id = "name-entity";
    container.className = "name-entity-container"; 
    container.style.display = "none";
    monthField.insertAdjacentElement("afterend", container);
    return container;
}
const formData = document.querySelector("#observationForm");
const spinner = document.querySelector("#spinner");
const results = document.querySelector("#results");

formData.addEventListener("submit", (e) => {
    e.preventDefault(); //Preventing default values from being tabulated
    results.style.display = "none";
    //The remainder here should commmunicate with the backend and fetch the results as needed
    //Lines below are just a template as to how the results would look in a proof-of-concept
    const validSSCheck = ctgSelector.value === "solar-system" && entityMenu && entityMenu.value !== "Select Entity" && monthField.value;
    const validDSCheck = ctgSelector.value === "deep-sky" && entityMenu && entityMenu.value !== "Select Entity" && nameEntity.querySelector("select") && nameEntity.querySelector("select").value !== "Select Entity Name";
    //Checks in place to ensure results do not show without proper field entries
    if ((validSSCheck) || (validDSCheck)) {
        spinner.style.display = "block";
        setTimeout(() => {
            displayResults();
            spinner.style.display = "none";
        }, 1000);
    }
    else {
        results.innerHTML = `<p class="errorText">Please fill all the fields</p>`;
        results.style.display = "block";
    }
});

function displayResults() { //This function will create the results div and show whatever results have been found
    results.innerHTML = ''; 
    //The remainder of the logic would go here once the website is hosted to display the results
    //This is just a placeholder for demonstration purposes
    const obsImg = document.createElement("img");
    obsImg.src = "images/test-img.jpg";
    obsImg.alt = "The Sun - Observed 06/08/2023";    //Can add the date of the observation
    obsImg.className = "observation-img";

    const obsText = document.createElement("p");
    obsText.textContent = "The Sun - Observed 23/01/2025";
    obsText.className = "observation-txt";
    results.append(obsImg, obsText);
    results.style.display = "block";
}