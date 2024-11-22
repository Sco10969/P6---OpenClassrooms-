import { LocalStorageManager } from '../../utils/local-storage.js';

export class TotalLikes {
    #mediaList;
    #photographerPrice;
    #totalLikes;
    #element;

    constructor(mediaList, photographerPrice) {
        this.#mediaList = mediaList;
        this.#photographerPrice = photographerPrice;
        this.#totalLikes = this.#calculateTotalLikes();
        
        // Écouter les événements de like
        document.addEventListener('likeUpdated', () => this.update());
    }

    #calculateTotalLikes() {
        return LocalStorageManager.getTotalLikes(this.#mediaList);
    }

    #createLikesCounter() {
        const likesContainer = document.createElement('div');
        likesContainer.classList.add('likes-count');
        
        const likesNumber = document.createElement('span');
        likesNumber.textContent = this.#totalLikes;
        
        const heartIcon = document.createElement('img');
        heartIcon.src = 'assets/icons/favorite-24px 1.svg';
        heartIcon.alt = 'likes';

        likesContainer.append(likesNumber, heartIcon);
        return likesContainer;
    }

    #createPriceTag() {
        const price = document.createElement('div');
        price.classList.add('price');
        price.textContent = `${this.#photographerPrice}€ / jour`;
        return price;
    }

    render() {
        const overlay = document.createElement('div');
        overlay.classList.add('total-likes-overlay');

        overlay.append(
            this.#createLikesCounter(),
            this.#createPriceTag()
        );

        this.#element = overlay;
        return overlay;
    }

    update() {
        this.#totalLikes = this.#calculateTotalLikes();
        
        const likesNumber = this.#element?.querySelector('.likes-count span');
        if (likesNumber) {
            likesNumber.textContent = this.#totalLikes;
        }
    }
}
