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
            class: 'card-index',
            children: [
                // Lien principal
                {
                    tag: 'a',
                    class: 'link',
                    attrs: {
                        href: `./photographer.html?id=${photographerData.id}`,
                        'aria-label': `Voir le profil de ${photographerData.name}`
                    },
                    children: [
                        // Container image
                        {
                            tag: 'div',
                            class: 'img-container',
                            children: [{
                                tag: 'img',
                                class: 'portrait',
                                attrs: {
                                    src: `assets/photographers/${photographerData.portrait}`,
                                    alt: `Portrait de ${photographerData.name}`
                                }
                            }]
                        },
                        // Nom
                        {
                            tag: 'h2',
                            class: 'name',
                            text: photographerData.name
                        }
                    ]
                },
                // Description
                {
                    tag: 'div',
                    class: 'description',
                    children: [
                        {
                            tag: 'span',
                            class: 'location',
                            text: `${photographerData.city}, ${photographerData.country}`
                        },
                        {
                            tag: 'p',
                            class: 'tagline',
                            text: photographerData.tagline
                        },
                        {
                            tag: 'data',
                            class: 'price',
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

    function buildElement({ tag, class: className, attrs, text, children = [] }) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (attrs) Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
        if (text) element.textContent = text;
        children.forEach(child => element.appendChild(buildElement(child)));
        return element;
    }

    return { getUserCardDOM, getPhotographerHeaderDOM, getMediaSectionDOM };
}
