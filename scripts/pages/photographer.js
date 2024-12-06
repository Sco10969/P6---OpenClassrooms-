import { MediaCard } from '../components/media-card/media-card.js';
import { PhotographerHeader } from '../components/photographer-header/photographer-header.js';
import { TotalLikes } from '../components/total-likes/total-likes.js';
import { LightboxModal } from '../components/modals/lightbox-modal/lightbox-modal.js';
import { SortMenu } from '../components/sort-menu/sort-menu.js';

class PhotographerPage {
    constructor() {
        this.photographerId = new URLSearchParams(window.location.search).get('id');
        this.currentSortOption = null;
        this.isAscending = true;
        this.lightbox = new LightboxModal();
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

        // Menu de tri
        const sortMenu = new SortMenu((sortOption) => this.sortMedia(sortOption, mediaData, photographerData.name));
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

    sortMedia(sortOption, mediaData, photographerName) {
        if (this.currentSortOption === sortOption) {
            this.isAscending = !this.isAscending;
        } else {
            this.isAscending = true;
        }
        this.currentSortOption = sortOption;

        console.log(`Sorting by: ${sortOption}, Ascending: ${this.isAscending}`);

        switch (sortOption) {
            case 'popularity':
                mediaData.sort((a, b) => this.isAscending ? b.likes - a.likes : a.likes - b.likes);
                break;
            case 'date':
                mediaData.sort((a, b) => this.isAscending ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));
                break;
            case 'title':
                mediaData.sort((a, b) => this.isAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
                break;
        }
        this.renderMediaSection(mediaData, photographerName);
    }
}

// Initialisation
window.onload = () => {
    const photographerPage = new PhotographerPage();
    photographerPage.init();
};
