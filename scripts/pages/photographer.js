import { MediaCard } from '../components/media-card/media-card.js';
import { PhotographerHeader } from '../components/photographer-header/photographer-header.js';
import { TotalLikes } from '../components/total-likes/total-likes.js';
import { LightboxModal } from '../components/modals/lightbox-modal/lightbox-modal.js';
import { SortMenu } from '../components/sort-menu/sort-menu.js';
import { Logo } from '../components/logo/logo.js';
import { buildElement } from '../utils/dom-utils.js';

class PhotographerPage {
    constructor() {
        // Récupère l'ID du photographe depuis l'URL
        this.photographerId = new URLSearchParams(window.location.search).get('id');
        this.mediaSetup = null;
        this.lightbox = new LightboxModal();
        this.app = document.getElementById('app');
    }

    render() {
        // Création du logo
        const logo = new Logo().render();

        // Structure de la page
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
                    tag: 'main',
                    className: 'media_section',
                    attrs: {
                        role: 'main',
                        'aria-label': 'Galerie du photographe'
                    }
                }
            ]
        };

        // Ajout de la structure de la page à l'app
        this.app.appendChild(buildElement(pageStructure));
    }

    init() {
        if (!this.photographerId) return;

        // Chargement des données
        fetch('./data/photographers.json')
            .then(response => {
                if (!response.ok) throw new Error('Erreur de chargement');
                return response.json();
            })
            .then(data => {
                // Recherche du photographe
                const photographerData = data.photographers.find(
                    // Recherche du photographe par ID
                    photographer => photographer.id == this.photographerId
                );

                // Filtrage des médias du photographe
                const mediaData = data.media.filter(
                    // Filtrage des médias par ID du photographe
                    mediaItem => mediaItem.photographerId == this.photographerId
                );
                // mediaData contient maintenant un tableau d'objets média
                // Exemple: [{ id: 1, image: "photo.jpg" }, { id: 2, video: "video.mp4" }]

                // Rendu de la page
                this.render();

                // Affichage des données du photographe
                this.displayPhotographer(photographerData, mediaData);
            })
            .catch(error => console.error('Erreur:', error));
    }

    displayPhotographer(photographerData, mediaData) {
        // Sauvegarde de l'état initial
        this.mediaSetup = [...mediaData];

        // Header
        const header = new PhotographerHeader(photographerData);
        document.querySelector('main').before(header.render());

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

    // Création des cartes médias
    renderMediaSection(mediaData, photographerName) {
        // Récupération de la section des médias
        const mediaSection = document.querySelector('.media_section');
        mediaSection.innerHTML = '';

        // Création et ajout des cartes médias
        mediaData.forEach(media => {
             // Pour chaque média, on crée une carte média
            const mediaCard = new MediaCard(media, photographerName, this.lightbox);
            // media est passé au constructeur de MediaCard
            mediaSection.appendChild(mediaCard.render());
        });
    }
}

// Initialisation
window.onload = () => {
    const photographerPage = new PhotographerPage();
    photographerPage.init();
};
