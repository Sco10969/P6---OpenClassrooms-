import { buildElement } from '../../utils/dom-utils.js';
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
            className: 'total-likes-overlay',
            children: [
                // Compteur de likes
                {
                    tag: 'div',
                    className: 'likes-count',
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
                    className: 'price',
                    text: `${this.photographerPrice}€ / jour`
                }
            ]
        };

        this.element = buildElement(overlayStructure);
        return this.element;
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
