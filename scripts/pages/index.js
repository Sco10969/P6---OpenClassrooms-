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

        return this.buildElement(pageStructure);
    }

    buildElement({ tag, class: className, attrs, text, children = [] }) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (attrs) Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
        if (text) element.textContent = text;
        children.forEach(child => element.appendChild(this.buildElement(child)));
        return element;
    }
}

// Initialisation
window.onload = () => {
    const indexPage = new IndexPage();
    indexPage.init();
};
