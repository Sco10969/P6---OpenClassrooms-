import { buildElement } from '../../utils/dom-utils.js';
import { LocalStorageManager } from '../../utils/local-storage.js';

export class LikeButton {
    constructor(mediaId, initialLikes) {
        this.storage = new LocalStorageManager();
        this.mediaId = mediaId;
        this.initialLikes = initialLikes;
        this.likes = this.storage.getLikes(mediaId, initialLikes);
        this.isLiked = this.storage.getLikeState(mediaId);
    }

    toggleLike() {
        const newState = this.storage.updateLikeState(
            this.mediaId,
            !this.isLiked,
            this.initialLikes
        );

        this.likes = newState.likes;
        this.isLiked = newState.isLiked;

        document.dispatchEvent(new CustomEvent('likeUpdated'));

        return { likes: this.likes, isLiked: this.isLiked };
    }

    render() {
        const buttonStructure = {
            tag: 'div',
            className: 'likes-container',
            children: [
                {
                    tag: 'span',
                    className: 'likes-count',
                    text: this.likes
                },
                {
                    tag: 'button',
                    className: `like-button ${this.isLiked ? 'liked' : ''}`,
                    children: [{
                        tag: 'img',
                        className: this.isLiked ? 'liked' : '',
                        attrs: {
                            src: 'assets/icons/favorite-24px 1.svg',
                            alt: 'like icon'
                        }
                    }]
                }
            ]
        };

        const element = buildElement(buttonStructure);
        
        // Event listener pour le like
        const button = element.querySelector('.like-button');
        button.onclick = () => {
            const state = this.toggleLike();
            element.querySelector('.likes-count').textContent = state.likes;
            button.classList.toggle('liked');
            button.querySelector('img').classList.toggle('liked');
        };

        return element;
    }
}
