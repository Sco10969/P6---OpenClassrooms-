import { MediaCard } from '../components/media-card/media-card.js';
import { PhotographerHeader } from '../components/photographer-header/photographer-header.js';
import { TotalLikes } from '../components/total-likes/total-likes.js';
import { LightboxModal } from '../components/modals/lightbox-modal/lightbox-modal.js';
import { ContactModal } from '../components/modals/contact-modal/contact-modal.js';
import { ModalManager } from '../utils/modal-manager.js';

async function getPhotographer() {
    const photographerId = new URLSearchParams(window.location.search).get('id');
    if (!photographerId) return null;

    const response = await fetch('./data/photographers.json');
    if (!response.ok) throw new Error('Erreur lors de la récupération des données');

    const { photographers, media } = await response.json();
    const photographerData = photographers.find(photographer => photographer.id == photographerId);
    const mediaData = media.filter(mediaItem => mediaItem.photographerId == photographerId);

    return { photographerData, mediaData };
}

async function init() {
    const { photographerData, mediaData } = await getPhotographer();
    if (!photographerData) return;

    const header = new PhotographerHeader(photographerData);
    document.querySelector('.photographer_header').appendChild(header.render());

    const mediaWithPhotographer = mediaData.map(media => ({
        ...media,
        photographerName: photographerData.name
    }));

    const mediaSection = document.querySelector('.media_section');
    mediaWithPhotographer.forEach(media => {
        const mediaCard = new MediaCard(media, photographerData.name);
        mediaSection.appendChild(mediaCard.render());
    });

    const totalLikes = new TotalLikes(mediaData, photographerData.price);
    document.querySelector('.container').appendChild(totalLikes.render());

    ModalManager.register('contact', ContactModal);
    ModalManager.register('lightbox', LightboxModal);
}

init();
