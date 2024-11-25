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
            class: 'container',
            children: [
                {
                    tag: 'header',
                    children: [
                        {
                            tag: 'img',
                            class: 'logo',
                            attrs: {
                                src: 'assets/images/logo.png',
                                alt: 'Fisheye Home page'
                            }
                        },
                        {
                            tag: 'h1',
                            text: 'Nos photographes'
                        }
                    ]
                },
                {
                    tag: 'main',
                    attrs: { id: 'main' },
                    children: [{
                        tag: 'div',
                        class: 'photographer_section'
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
