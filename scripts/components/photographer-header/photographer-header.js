import { buildElement } from '../../utils/dom-utils.js';
import { ContactModal } from '../modals/contact-modal/contact-modal.js';

export class PhotographerHeader {
    constructor(photographer) {
        this.photographer = photographer;
        this.contactModal = new ContactModal(photographer.name);
    }

    render() {
        const headerStructure = {
            tag: 'article',
            className: 'photographer_header',
            children: [
                // Info Section
                {
                    tag: 'div',
                    className: 'photographer_info',
                    children: [
                        {
                            tag: 'h1',
                            className: 'name',
                            text: this.photographer.name
                        },
                        {
                            tag: 'p',
                            className: 'location',
                            text: `${this.photographer.city}, ${this.photographer.country}`
                        },
                        {
                            tag: 'p',
                            className: 'tagline',
                            text: this.photographer.tagline
                        }
                    ]
                },
                // Contact Button
                {
                    tag: 'button',
                    className: 'contact_button',
                    text: 'Contactez-moi',
                    attrs: {
                        'aria-label': 'Contacter le photographe'
                    }
                },
                // Portrait
                {
                    tag: 'img',
                    attrs: {
                        src: `assets/photographers/${this.photographer.portrait}`,
                        alt: this.photographer.name
                    }
                }
            ]
        };

        const header = buildElement(headerStructure);
        
        // Event sur le bouton contact
        const contactButton = header.querySelector('.contact_button');
        contactButton.onclick = () => {
            this.contactModal.open();
        };

        return header;
    }
}
