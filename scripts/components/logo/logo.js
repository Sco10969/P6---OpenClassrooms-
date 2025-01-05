import { buildElement } from '../../utils/dom-utils.js';

export class Logo {
    render() {
        const logoStructure = {
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
                    role: 'img',
                    width: '200',
                    height: '50'
                }
            }]
        };

        return buildElement(logoStructure);
    }
} 