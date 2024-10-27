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

            const mediaData = data.media.filter(media => media.photographerId == photographerId);
            console.log("Media Data:", mediaData);

            return { photographerData, mediaData };
        } else {
            console.error("Failed to fetch photographers data");
            return null;
        }
    } catch (error) {
        console.error("Error fetching photographers data:", error);
        return null;
    }
}

async function displayData(photographerState) {
    const photographersHeader = document.querySelector(".photographer_header");
    const mediaSection = document.querySelector(".media_section");

    const photographerModel = photographerTemplate(photographerState);
    const photographerHeaderDOM = photographerModel.getPhotographerHeaderDOM();
    photographersHeader.appendChild(photographerHeaderDOM);

    const mediaSectionDOM = photographerModel.getMediaSectionDOM();
    mediaSectionDOM.forEach(card => mediaSection.appendChild(card));
}

async function init() {
    const photographerState = await getPhotographer();
    displayData(photographerState);
}

window.onload = init;

document.querySelector('.contact_button').addEventListener('click', displayModal);
document.querySelector('#contact_modal').addEventListener('click', closeModal);
