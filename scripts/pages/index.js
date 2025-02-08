import { buildElement } from '../utils/dom-utils.js';
import { photographerTemplate } from '../templates/photographer.js';
import { Logo } from '../components/logo/logo.js';

class IndexPage {
    constructor() {
        this.app = document.getElementById('app');
    }

    render() {
        // Création du logo
        const logo = new Logo().render();

        // Structure de la page
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

        // Création de l'élément de la page
        const element = buildElement(pageStructure);
        // Ajout de l'élément à l'app
        this.app.appendChild(element);
        // Récupération de la section des photographes
        this.photographersSection = document.querySelector(".photographer_section");
    }

    init() {
        this.render();
        // Chargement des données des photographes
        fetch('./data/photographers.json')
            .then(response => response.json())
            .then(data => {
                // Parcours des photographes
                data.photographers.forEach(photographer => {
                    // Rendu de la carte photographe
                    const template = photographerTemplate({ photographerData: photographer });
                    // Ajout de la carte photographe à la section des photographes
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
