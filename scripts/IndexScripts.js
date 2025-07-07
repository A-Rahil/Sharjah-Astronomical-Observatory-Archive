const ctgSelector = document.querySelector("#category");    //Selection for either deep sky or solar system
const entityMenu = document.querySelector("#entity");   //This is the primary entity type after selecting deep-sky or solar-system
const monthField = document.querySelector("#month");
const nameEntity = document.querySelector("#name-entity");  //This is the secondary name of each element
const deepSkyNames = {
    "comets": [
        {value: "test", text: "Test"},
    ],  //Names of each element will go here, along with the values
    "exoplanets": [""],
    "clusters": [""],
    "nebulae": [""],
    "stars": [""],
    "supernovae": [""],
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
    obsImg.alt = "Placeholder Text";    //Can add the date of the observation
    obsImg.className = "observation-img";

    const obsText = document.createElement("p");
    obsText.textContent = "Placeholder Text";
    obsText.className = "observation-txt";
    results.append(obsImg, obsText);
    results.style.display = "block";
}