import FetchWrapper from "./fetch-wrapper.js";

const API = new FetchWrapper("https://api.github.com");
const reposList = document.querySelector("#repos-list");
const form = document.querySelector("#repos-form");
const userName = document.querySelector("#github-username");
const button = document.querySelector("#get-repos");

form.addEventListener("submit", event => {
    event.preventDefault();
    
    // vymazanie predchádzajúceho hladania pri novom hľadaní
    reposList.innerHTML = "";
    
    // po kliknutí na button sa točí spinner
    startLoader(button);

    API.get(`/users/${userName.value}/repos`)
    .then(data => {
        // keďže data je pole objektov, použijeme forEach na prechádzanie všetkými objektami jednotlivo
        data.forEach(repo => {
            reposList.insertAdjacentHTML("beforeend",
                `<li>
                    <a href="https://github.com/${repo.full_name}" target="_blank">
                        <h2>${repo.full_name}</h2>
                        <p>${repo.name}</p>
                    </a> 
                </li>`
            );
        });
    })
    .finally(() =>{
        // po načítaní všetkých údajov sa spinner dotočí a button bude opäť s názvom Get repos
        stopLoader(button, "Get repos");

        // vymazanie údaju v inpute formulára
        userName.value = "";
    });
});


// function for loader

const startLoader = (element) => {
    element.innerHTML = `<div class="loading-spinner"</div>`;
}

const stopLoader = (element, value) => {
    element.textContent = value;
}

