import { LocalStorageManager } from '../../utils/localStorage.js';

export class TotalLikes {
    constructor(mediaList, photographerPrice) {
        this.mediaList = mediaList;
        this.photographerPrice = photographerPrice;
        this.totalLikes = this.calculateTotalLikes();
    }

    calculateTotalLikes() {
        return LocalStorageManager.getTotalLikes(this.mediaList);
    }

    render() {
        const overlay = document.createElement('div');
        overlay.classList.add('total-likes-overlay');

        const likesContainer = document.createElement('div');
        likesContainer.classList.add('likes-count');
        
        const likesNumber = document.createElement('span');
        likesNumber.textContent = this.totalLikes;
        
        const heartIcon = document.createElement('img');
        heartIcon.setAttribute('src', 'assets/icons/favorite-24px 1.svg');
        heartIcon.setAttribute('alt', 'likes');

        const price = document.createElement('div');
        price.classList.add('price');
        price.textContent = `${this.photographerPrice}€ / jour`;

        likesContainer.appendChild(likesNumber);
        likesContainer.appendChild(heartIcon);
        overlay.appendChild(likesContainer);
        overlay.appendChild(price);

        return overlay;
    }

    update() {
        this.totalLikes = this.calculateTotalLikes();
        const likesNumber = document.querySelector('.total-likes-overlay .likes-count span');
        if (likesNumber) {
            likesNumber.textContent = this.totalLikes;
        }
    }
}
