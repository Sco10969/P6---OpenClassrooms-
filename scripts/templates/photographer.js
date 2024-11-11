import { PhotographerHeader } from '../components/PhotographerHeader/PhotographerHeader.js';
import { MediaCard } from '../components/MediaCard/MediaCard.js';

/**
 * Template pour la page photographe
 * @param {Object} photographerState Les données du photographe et ses médias
 */
export function photographerTemplate(photographerState) {
    const { photographerData, mediaData } = photographerState;

    /**
     * Génère la carte du photographe pour la page d'index
     */
    function getUserCardDOM() {
        const { name, portrait, city, country, tagline, price, id } = photographerData;
        const picture = `assets/photographers/${portrait}`;

        const card = document.createElement('figure');
        card.classList.add('card-index');

        const link = document.createElement('a');
        link.classList.add('link');
        link.setAttribute("href", `./photographer.html?id=${id}`);
        link.setAttribute('aria-label', `Voir le profil de ${name}`);

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        const img = document.createElement('img');
        img.classList.add('portrait');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);

        const h2 = document.createElement('h2');
        h2.classList.add('name');
        h2.textContent = name;

        const description = document.createElement('div');
        description.classList.add('description');

        const location = document.createElement('span');
        location.classList.add('location');
        location.textContent = `${city}, ${country}`;

        const taglineElement = document.createElement('p');
        taglineElement.classList.add('tagline');
        taglineElement.textContent = tagline;

        const priceElement = document.createElement('data');
        priceElement.classList.add('price');
        priceElement.textContent = `${price}€/jour`;

        // Construction du DOM
        imgContainer.appendChild(img);
        link.appendChild(imgContainer);
        link.appendChild(h2);
        description.appendChild(location);
        description.appendChild(taglineElement);
        description.appendChild(priceElement);
        card.appendChild(link);
        card.appendChild(description);

        return card;
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
        return mediaData.map(media => {
            const mediaCard = new MediaCard(media, photographerData.name);
            return mediaCard.render();
        });
    }

    return { getUserCardDOM, getPhotographerHeaderDOM, getMediaSectionDOM };
}
