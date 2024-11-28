import { MediaCard } from '../components/media-card/media-card.js';
import { PhotographerHeader } from '../components/photographer-header/photographer-header.js';
import { TotalLikes } from '../components/total-likes/total-likes.js';
import { LightboxModal } from '../components/modals/lightbox-modal/lightbox-modal.js';

class PhotographerPage {
    constructor() {
        this.photographerId = new URLSearchParams(window.location.search).get('id');
    }

    init() {
        if (!this.photographerId) return;

        fetch('./data/photographers.json')
            .then(response => {
                if (!response.ok) throw new Error('Erreur de chargement');
                return response.json();
            })
            .then(data => {
                const photographerData = data.photographers.find(
                    photographer => photographer.id == this.photographerId
                );
                
                const mediaData = data.media.filter(
                    mediaItem => mediaItem.photographerId == this.photographerId
                );

                this.displayPhotographer(photographerData, mediaData);
            })
            .catch(error => console.error('Erreur:', error));
    }

    displayPhotographer(photographerData, mediaData) {
        // Header
        const header = new PhotographerHeader(photographerData);
        document.querySelector('.photographer_header').appendChild(header.render());

        // Media Section
        const mediaWithPhotographer = mediaData.map(media => ({
            ...media,
            photographerName: photographerData.name
        }));

        const lightbox = new LightboxModal();

        const mediaSection = document.querySelector('.media_section');
        mediaWithPhotographer.forEach(media => {
            const mediaCard = new MediaCard(media, photographerData.name, lightbox);
            mediaSection.appendChild(mediaCard.render());
        });

        // Total Likes
        const totalLikes = new TotalLikes(mediaData, photographerData.price);
        document.querySelector('.container').appendChild(totalLikes.render());
    }
}

// Initialisation
window.onload = () => {
    const photographerPage = new PhotographerPage();
    photographerPage.init();
};
