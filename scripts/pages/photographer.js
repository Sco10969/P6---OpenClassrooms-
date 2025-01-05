import { MediaCard } from '../components/media-card/media-card.js';
import { PhotographerHeader } from '../components/photographer-header/photographer-header.js';
import { TotalLikes } from '../components/total-likes/total-likes.js';
import { LightboxModal } from '../components/modals/lightbox-modal/lightbox-modal.js';
import { SortMenu } from '../components/sort-menu/sort-menu.js';
import { Logo } from '../components/logo/logo.js';
import { buildElement } from '../utils/dom-utils.js';

class PhotographerPage {
    constructor() {
        this.photographerId = new URLSearchParams(window.location.search).get('id');
        this.mediaSetup = null;
        this.lightbox = new LightboxModal();
        this.app = document.getElementById('app');
    }

    render() {
        const logo = new Logo().render();

        const pageStructure = {
            tag: 'div',
            className: 'container',
            children: [
                {
                    tag: 'header',
                    attrs: { role: 'banner' },
                    children: [
                        logo
                    ]
                },
                {
                    tag: 'div',
                    className: 'photographer_header'
                },
                {
                    tag: 'main',
                    className: 'media_section',
                    attrs: {
                        role: 'main',
                        'aria-label': 'Galerie du photographe'
                    }
                }
            ]
        };

        this.app.appendChild(buildElement(pageStructure));
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

                this.render();
                this.displayPhotographer(photographerData, mediaData);
            })
            .catch(error => console.error('Erreur:', error));
    }

    displayPhotographer(photographerData, mediaData) {
        // Sauvegarde de l'état initial
        this.mediaSetup = [...mediaData];

        // Header
        const header = new PhotographerHeader(photographerData);
        document.querySelector('.photographer_header').appendChild(header.render());

        // Menu de tri
        const sortMenu = new SortMenu((sortOption, direction) => {
            if (direction === 'none') {
                // Retour à l'état initial si pas de tri
                this.renderMediaSection([...this.mediaSetup], photographerData.name);
                return;
            }

            // Tri des données
            const sortedData = sortMenu.sortData(mediaData, sortOption, direction);
            this.renderMediaSection(sortedData, photographerData.name);
        });
        document.querySelector('.media_section').before(sortMenu.render());

        // Media Section
        this.renderMediaSection(mediaData, photographerData.name);

        // Total Likes
        const totalLikes = new TotalLikes(mediaData, photographerData.price);
        document.querySelector('.container').appendChild(totalLikes.render());
    }

    renderMediaSection(mediaData, photographerName) {
        const mediaSection = document.querySelector('.media_section');
        mediaSection.innerHTML = '';

        mediaData.forEach(media => {
            const mediaCard = new MediaCard(media, photographerName, this.lightbox);
            mediaSection.appendChild(mediaCard.render());
        });
    }
}

// Initialisation
window.onload = () => {
    const photographerPage = new PhotographerPage();
    photographerPage.init();
};
