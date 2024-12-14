import { buildElement } from '../../utils/dom-utils.js';
import { LocalStorageManager } from '../../utils/local-storage.js';

export class TotalLikes {
    constructor(mediaList, photographerPrice) {
        this.storage = new LocalStorageManager();
        this.mediaList = mediaList;
        this.photographerPrice = photographerPrice;
        this.totalLikes = this.calculateTotalLikes();

        // Écouter les événements de like
        document.addEventListener('likeUpdated', () => this.update());
    }

    calculateTotalLikes() {
        return this.storage.getTotalLikes(this.mediaList);
    }

    update() {
        this.totalLikes = this.calculateTotalLikes();
        if (this.element) {
            this.element.querySelector('.likes-count span').textContent = this.totalLikes;
        }
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
}
