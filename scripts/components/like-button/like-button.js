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
                    attrs: {
                        'aria-label': `${this.likes} likes`
                    },
                    text: this.likes
                },
                {
                    tag: 'button',
                    className: `like-button ${this.isLiked ? 'liked' : ''}`,
                    attrs: {
                        'aria-label': this.isLiked ? 'Retirer le like' : 'Ajouter un like',
                        'aria-pressed': this.isLiked ? 'true' : 'false'
                    },
                    children: [{
                        tag: 'img',
                        className: this.isLiked ? 'liked' : '',
                        attrs: {
                            src: 'assets/icons/favorite-24px 1.svg',
                            alt: '',
                            'aria-hidden': 'true'
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
            element.querySelector('.likes-count').setAttribute('aria-label', `${state.likes} likes`);
            button.classList.toggle('liked');
            button.setAttribute('aria-pressed', state.isLiked ? 'true' : 'false');
            button.setAttribute('aria-label', state.isLiked ? 'Retirer le like' : 'Ajouter un like');
            button.querySelector('img').classList.toggle('liked');
        };

        return element;
    }
}
