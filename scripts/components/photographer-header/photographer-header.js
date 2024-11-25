import { buildElement } from '../../utils/dom-utils.js';
import { ContactModal } from '../modals/contact-modal/contact-modal.js';

export class PhotographerHeader {
    #photographer;

    constructor(photographer) {
        this.#photographer = photographer;
    }

    render() {
        const headerStructure = {
            tag: 'article',
            class: 'photographer_header',
            children: [
                // Info Section
                {
                    tag: 'div',
                    class: 'photographer_info',
                    children: [
                        {
                            tag: 'h1',
                            class: 'name',
                            text: this.#photographer.name
                        },
                        {
                            tag: 'p',
                            class: 'location',
                            text: `${this.#photographer.city}, ${this.#photographer.country}`
                        },
                        {
                            tag: 'p',
                            class: 'tagline',
                            text: this.#photographer.tagline
                        }
                    ]
                },
                // Contact Button
                {
                    tag: 'button',
                    class: 'contact_button',
                    text: 'Contactez-moi',
                    attrs: {
                        'aria-label': 'Contacter le photographe'
                    }
                },
                // Portrait
                {
                    tag: 'img',
                    attrs: {
                        src: `assets/photographers/${this.#photographer.portrait}`,
                        alt: this.#photographer.name
                    }
                }
            ]
        };

        const header = buildElement(headerStructure);
        
        // Event sur le bouton contact
        const contactButton = header.querySelector('.contact_button');
        contactButton.onclick = () => {
            const contactModal = new ContactModal(this.#photographer.name);
            contactModal.open();
        };

        return header;
    }
}
