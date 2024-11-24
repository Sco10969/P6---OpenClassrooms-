import { LocalStorageManager } from '../../utils/local-storage.js';

export class TotalLikes {
    constructor(mediaList, photographerPrice) {
        const structure = {
            storage: new LocalStorageManager(),
            list: mediaList,
            price: photographerPrice
        };

        this.storage = structure.storage;
        this.mediaList = structure.list;
        this.photographerPrice = structure.price;
        this.totalLikes = this.calculateTotalLikes();
        
        // Écouter les événements de like
        document.addEventListener('likeUpdated', () => this.update());
    }

    render() {
        const overlayStructure = {
            tag: 'div',
            class: 'total-likes-overlay',
            children: [
                // Compteur de likes
                {
                    tag: 'div',
                    class: 'likes-count',
                    children: [
                        {
                            tag: 'span',
                            text: this.totalLikes
                        },
                        {
                            tag: 'img',
                            attrs: {
                                src: 'assets/icons/favorite-24px 1.svg',
                                alt: 'likes'
                            }
                        }
                    ]
                },
                // Prix
                {
                    tag: 'div',
                    class: 'price',
                    text: `${this.photographerPrice}€ / jour`
                }
            ]
        };

        this.element = this.buildElement(overlayStructure);
        return this.element;
    }

    buildElement({ tag, class: className, attrs, text, children = [] }) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (attrs) Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
        if (text) element.textContent = text;
        children.forEach(child => element.appendChild(this.buildElement(child)));
        return element;
    }

    calculateTotalLikes() {
        return this.storage.getTotalLikes(this.mediaList);
    }

    update() {
        this.totalLikes = this.calculateTotalLikes();
        const likesNumber = this.element?.querySelector('.likes-count span');
        if (likesNumber) {
            likesNumber.textContent = this.totalLikes;
        }
    }
}
