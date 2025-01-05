import { buildElement } from '../utils/dom-utils.js';
import { photographerTemplate } from '../templates/photographer.js';
import { Logo } from '../components/logo/logo.js';

class IndexPage {
    constructor() {
        this.app = document.getElementById('app');
    }

    render() {
        const logo = new Logo().render();
        
        const pageStructure = {
            tag: 'div',
            className: 'container',
            children: [
                {
                    tag: 'header',
                    attrs: { role: 'banner' },
                    children: [
                        logo,
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

        const element = buildElement(pageStructure);
        this.app.appendChild(element);
        this.photographersSection = document.querySelector(".photographer_section");
    }

    init() {
        this.render();
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
}

// Initialisation
window.onload = () => {
    const indexPage = new IndexPage();
    indexPage.init();
};
