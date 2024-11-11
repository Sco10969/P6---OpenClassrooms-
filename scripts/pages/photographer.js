import { ModalManager } from '../utils/ModalManager.js';
import { MediaCard } from '../components/MediaCard/MediaCard.js';
import { PhotographerHeader } from '../components/PhotographerHeader/PhotographerHeader.js';
import { TotalLikes } from '../components/TotalLikes/TotalLikes.js';

function getPhotographerId() {
    return new URLSearchParams(window.location.search).get('id');
}

async function fetchPhotographerData() {
    try {
        const response = await fetch('./data/photographers.json');
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');

        const { photographers, media } = await response.json();
        const photographerId = getPhotographerId();
        
        return {
            photographerData: photographers.find(photographer => photographer.id == photographerId),
            mediaData: media.filter(mediaItem => mediaItem.photographerId == photographerId)
        };
    } catch (error) {
        console.error("Erreur:", error);
        return null;
    }
}

function renderPage(data) {
    if (!data) return;

    const { photographerData, mediaData } = data;
    
    // Rendu du header
    const header = new PhotographerHeader(photographerData);
    document.querySelector('.photographer_header').appendChild(header.render());

    // Rendu des médias
    const mediaSection = document.querySelector('.media_section');
    mediaData.forEach(media => {
        const mediaCard = new MediaCard(media, photographerData.name);
        mediaSection.appendChild(mediaCard.render());
    });

    // Ajout de l'overlay TotalLikes
    const totalLikes = new TotalLikes(mediaData, photographerData.price);
    document.querySelector('.container').appendChild(totalLikes.render());

    // Mise à jour du total lors des likes
    document.addEventListener('likeUpdated', () => {
        totalLikes.update();
    });
}

function initEventListeners() {
    const contactButton = document.querySelector('.contact_button');
    const modal = document.querySelector('#contact_modal');
    const closeButton = modal?.querySelector('img[src*="close"]');

    contactButton?.addEventListener('click', () => {
        const photographerName = document.querySelector('.photographer_header .name')?.textContent;
        ModalManager.open(ModalManager.MODAL_TYPES.CONTACT, { photographerName });
    });

    closeButton?.addEventListener('click', () => ModalManager.closeModal());
    
    // Éviter la propagation sur le contenu de la modal
    modal?.querySelector('.modal')?.addEventListener('click', e => e.stopPropagation());
}

async function init() {
    const photographerData = await fetchPhotographerData();
    renderPage(photographerData);
    initEventListeners();
}

window.addEventListener('load', init);
