import { ModalManager } from '../../utils/ModalManager.js';

export class PhotographerHeader {
    constructor(photographerData) {
        this.photographer = photographerData;
    }

    render() {
        const { name, portrait, city, country, tagline } = this.photographer;
        const picture = `assets/photographers/${portrait}`;

        const card = document.createElement('figure');
        card.classList.add('card-index', 'detail-page');

        const headerContent = document.createElement('div');
        headerContent.classList.add('header-content');

        const nameElement = document.createElement('h2');
        nameElement.classList.add('name');
        nameElement.textContent = name;

        const locationElement = document.createElement('p');
        locationElement.classList.add('location');
        locationElement.textContent = `${city}, ${country}`;

        const taglineElement = document.createElement('p');
        taglineElement.classList.add('tagline');
        taglineElement.textContent = tagline;

        headerContent.appendChild(nameElement);
        headerContent.appendChild(locationElement);
        headerContent.appendChild(taglineElement);

        const contactButton = document.createElement('button');
        contactButton.classList.add('contact_button');
        contactButton.textContent = 'Contactez-moi';

        contactButton.addEventListener('click', () => {
            ModalManager.open(ModalManager.MODAL_TYPES.CONTACT, {
                photographerName: name
            });
        });

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        const img = document.createElement('img');
        img.classList.add('portrait');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `Portrait de ${name}`);

        imgContainer.appendChild(img);

        card.appendChild(headerContent);
        card.appendChild(contactButton);
        card.appendChild(imgContainer);

        return card;
    }
}
