import { buildElement } from '../../utils/dom-utils.js';
import { LocalStorageManager } from '../../utils/local-storage.js';

export class LikeButton {
    constructor(mediaId, initialLikes) {
        const structure = {
            storage: new LocalStorageManager(),
            id: mediaId,
            initial: initialLikes
        };

        this.storage = structure.storage;
        this.mediaId = structure.id;
        this.likes = this.storage.getLikes(this.mediaId) || structure.initial;
        this.isLiked = this.storage.getLikeState(this.mediaId);
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

    toggleLike() {
        this.isLiked = !this.isLiked;
        this.likes = this.isLiked ? this.likes + 1 : this.likes - 1;

        this.storage.saveLikeState(this.mediaId, this.isLiked);
        this.storage.saveLikes(this.mediaId, this.likes);

        document.dispatchEvent(new CustomEvent('likeUpdated'));
        
        return { likes: this.likes, isLiked: this.isLiked };
    }
}
