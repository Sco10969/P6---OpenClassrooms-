import { photographerTemplate } from '../templates/photographer.js';
import { displayModal, closeModal } from '../utils/contactForm.js';

function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log("Photographer ID:", id);
    return id;
}

async function getPhotographer() {
    try {
        const response = await fetch('./data/photographers.json');
        if (response.ok) {
            const data = await response.json();
            const photographerId = getPhotographerIdFromUrl();
            const photographerData = data.photographers.find(photographer => photographer.id == photographerId);
            console.log("Photographer Data:", photographerData);
            return photographerData;
        } else {
            console.error("Failed to fetch photographers data");
            return null;
        }
    } catch (error) {
        console.error("Error fetching photographers data:", error);
        return null;
    }
}

async function displayData(photographer) {
    const photographersHeader = document.querySelector(".photographer_header");

    const photographerModel = photographerTemplate(photographer, true);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersHeader.appendChild(userCardDOM);
}

async function init() {
    const photographer = await getPhotographer();
    displayData(photographer);
}

window.onload = init;

document.querySelector('.contact_button').addEventListener('click', displayModal);
document.querySelector('#contact_modal').addEventListener('click', closeModal);
