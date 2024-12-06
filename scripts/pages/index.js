import { buildElement } from '../utils/dom-utils.js';
import { photographerTemplate } from '../templates/photographer.js';

class IndexPage {
    constructor() {
        this.photographersSection = document.querySelector(".photographer_section");
    }

    init() {
        fetch('./data/photographers.json')
            .then(response => response.json())
            .then(data => {
                data.photographers.forEach(photographer => {
                    const template = photographerTemplate({ photographerData: photographer });
                    this.photographersSection.appendChild(template.getUserCardDOM());
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    render() {
        const pageStructure = {
            tag: 'div',
            className: 'container',
            children: [
                {
                    tag: 'header',
                    attrs: { role: 'banner' },
                    children: [
                        {
                            tag: 'a',
                            className: 'home-link',
                            attrs: {
                                href: 'index.html',
                                'aria-label': 'Fisheye Accueil',
                                role: 'link'
                            },
                            children: [{
                                tag: 'img',
                                className: 'logo',
                                attrs: {
                                    src: 'assets/images/logo.png',
                                    alt: 'Fisheye Home page',
                                    role: 'img'
                                }
                            }]
                        },
                        {
                            tag: 'h1',
                            text: 'Nos photographes',
                            attrs: {
                                tabindex: '0',
                                role: 'heading',
                                'aria-level': '1'
                            }
                        }
                    ]
                },
                {
                    tag: 'main',
                    attrs: { 
                        id: 'main',
                        role: 'main',
                        'aria-label': 'Liste des photographes'
                    },
                    children: [{
                        tag: 'div',
                        className: 'photographer_section',
                        attrs: {
                            role: 'region',
                            'aria-label': 'Galerie des photographes'
                        }
                    }]
                }
            ]
        };

        return buildElement(pageStructure);
    }
}

// Initialisation
window.onload = () => {
    const indexPage = new IndexPage();
    indexPage.init();
};
