import { ModalManager } from '../../utils/modal-manager.js';

export class PhotographerHeader {
    #photographer;

    constructor(photographer) {
        this.#photographer = photographer;
    }

    render() {
        const article = document.createElement('article');
        article.className = 'photographer_header';

        const info = document.createElement('div');
        info.className = 'photographer_info';

        const name = document.createElement('h1');
        name.className = 'name';
        name.textContent = this.#photographer.name;

        const location = document.createElement('p');
        location.className = 'location';
        location.textContent = `${this.#photographer.city}, ${this.#photographer.country}`;

        const tagline = document.createElement('p');
        tagline.className = 'tagline';
        tagline.textContent = this.#photographer.tagline;

        const contactButton = document.createElement('button');
        contactButton.className = 'contact_button';
        contactButton.textContent = 'Contactez-moi';
        contactButton.setAttribute('aria-label', 'Contacter le photographe');

        contactButton.addEventListener('click', () => {
            ModalManager.open('contact', this.#photographer.name);
        });

        const portrait = document.createElement('img');
        portrait.src = `assets/photographers/${this.#photographer.portrait}`;
        portrait.alt = this.#photographer.name;

        info.append(name, location, tagline);
        article.append(info, contactButton, portrait);

        return article;
    }
}
