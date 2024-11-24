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
            class: 'likes-container',
            children: [
                {
                    tag: 'span',
                    class: 'likes-count',
                    text: this.likes
                },
                {
                    tag: 'button',
                    class: `like-button ${this.isLiked ? 'liked' : ''}`,
                    children: [{
                        tag: 'img',
                        class: this.isLiked ? 'liked' : '',
                        attrs: {
                            src: 'assets/icons/favorite-24px 1.svg',
                            alt: 'like icon'
                        }
                    }]
                }
            ]
        };

        const element = this.buildElement(buttonStructure);
        
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

    buildElement({ tag, class: className, attrs, text, children = [] }) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (attrs) Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
        if (text) element.textContent = text;
        children.forEach(child => element.appendChild(this.buildElement(child)));
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
