import { buildElement } from '../utils/dom-utils.js';
import { PhotographerHeader } from '../components/photographer-header/photographer-header.js';
import { MediaCard } from '../components/media-card/media-card.js';

/**
 * Template pour la page photographe
 * @param {Object} photographerState Les données du photographe et ses médias
 */
export function photographerTemplate(photographerState) {
    const { photographerData } = photographerState;

    /**
     * Génère la carte du photographe pour la page d'index
     */
    function getUserCardDOM() {
        const cardStructure = {
            tag: 'figure',
            className: 'card-index',
            children: [
                // Lien principal
                {
                    tag: 'a',
                    className: 'link',
                    attrs: {
                        href: `./photographer.html?id=${photographerData.id}`,
                        'aria-label': `Voir le profil de ${photographerData.name}`
                    },
                    children: [
                        // Container image
                        {
                            tag: 'div',
                            className: 'img-container',
                            children: [{
                                tag: 'img',
                                className: 'portrait',
                                attrs: {
                                    src: `assets/photographers/${photographerData.portrait}`,
                                    alt: `${photographerData.name}`
                                }
                            }]
                        },
                        // Nom
                        {
                            tag: 'h2',
                            className: 'name',
                            text: photographerData.name
                        }
                    ]
                },
                // Description
                {
                    tag: 'div',
                    className: 'description',
                    children: [
                        {
                            tag: 'span',
                            className: 'location',
                            text: `${photographerData.city}, ${photographerData.country}`
                        },
                        {
                            tag: 'p',
                            className: 'tagline',
                            text: photographerData.tagline
                        },
                        {
                            tag: 'data',
                            className: 'price',
                            text: `${photographerData.price}€/jour`
                        }
                    ]
                }
            ]
        };

        return buildElement(cardStructure);
    }

    /**
     * Génère le header de la page photographe
     */
    function getPhotographerHeaderDOM() {
        const header = new PhotographerHeader(photographerData);
        return header.render();
    }

    /**
     * Génère la section média de la page photographe
     */
    function getMediaSectionDOM() {
        return photographerState.mediaData.map(media => {
            const mediaCard = new MediaCard(media, photographerData.name);
            return mediaCard.render();
        });
    }

    return { getUserCardDOM, getPhotographerHeaderDOM, getMediaSectionDOM };
}
