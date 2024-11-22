import { LocalStorageManager } from '../../utils/local-storage.js';

export class LikeButton {
    constructor(mediaId, initialLikes) {
        this.mediaId = mediaId;
        this.likes = this.getStoredLikes() || initialLikes;
        this.isLiked = this.getStoredLikeState();
    }

    getStoredLikes() {
        return LocalStorageManager.getLikes(this.mediaId);
    }

    getStoredLikeState() {
        return LocalStorageManager.getLikeState(this.mediaId);
    }

    toggleLike() {
        this.isLiked = !this.isLiked;
        this.likes = this.isLiked ? this.likes + 1 : this.likes - 1;

        LocalStorageManager.saveLikeState(this.mediaId, this.isLiked);
        LocalStorageManager.saveLikes(this.mediaId, this.likes);

        document.dispatchEvent(new CustomEvent('likeUpdated'));
 
        return {
            likes: this.likes,
            isLiked: this.isLiked
        };
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('likes-container');

        const likesCount = document.createElement('span');
        likesCount.classList.add('likes-count');
        likesCount.textContent = this.likes;

        const button = document.createElement('button');
        button.classList.add('like-button');
        if (this.isLiked) button.classList.add('liked');

        const heartIcon = this.createHeartIcon();
        if (this.isLiked) heartIcon.classList.add('liked');

        button.appendChild(heartIcon);
        button.addEventListener('click', () => {
            const state = this.toggleLike();
            likesCount.textContent = state.likes;
            button.classList.toggle('liked');
            heartIcon.classList.toggle('liked');
        });

        container.appendChild(likesCount);
        container.appendChild(button);

        return container;
    }

    createHeartIcon() {
        const heartIcon = document.createElement('img');
        heartIcon.setAttribute('src', 'assets/icons/favorite-24px 1.svg');
        heartIcon.setAttribute('alt', 'like icon');
        heartIcon.style.width = '21px';
        heartIcon.style.height = '24px';
        return heartIcon;
    }
} 