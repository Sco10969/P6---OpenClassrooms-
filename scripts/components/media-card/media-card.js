import { LikeButton } from '../like-button/like-button.js';
import { LightboxModal } from '../modals/lightbox-modal/lightbox-modal.js';

export class MediaCard {
    constructor(media, photographerName) {
        this.media = media;
        this.photographerName = photographerName;
    }

    render() {
        const cardStructure = {
            tag: 'article',
            class: 'media-card',
            attrs: { 'data-media-id': this.media.id },
            children: [
                // Media Wrapper
                {
                    tag: 'div',
                    class: 'media-wrapper',
                    children: [this.getMediaStructure()]
                },
                // Info Section
                {
                    tag: 'div',
                    class: 'media-info',
                    children: [
                        {
                            tag: 'span',
                            class: 'media-title',
                            text: this.media.title
                        },
                        {
                            tag: 'div',
                            class: 'likes-container',
                            setup: element => {
                                const likeButton = new LikeButton(this.media.id, this.media.likes);
                                element.appendChild(likeButton.render());
                            }
                        }
                    ]
                }
            ]
        };

        const card = this.buildElement(cardStructure);
        
        // Event pour la lightbox
        card.querySelector('.media-wrapper').onclick = () => {
            const lightbox = new LightboxModal({
                mediaList: this.getAllMedias(),
                currentIndex: this.getCurrentIndex()
            });
            lightbox.open();
        };

        return card;
    }

    getMediaStructure() {
        if (this.media.image) {
            return {
                tag: 'img',
                attrs: {
                    src: `assets/medias/${this.photographerName}/${this.media.image}`,
                    alt: this.media.title,
                    'data-filename': this.media.image
                }
            };
        }
        
        return {
            tag: 'video',
            attrs: {
                autoplay: true,
                loop: true,
                muted: true,
                playsInline: true,
                'data-filename': this.media.video
            },
            children: [{
                tag: 'source',
                attrs: {
                    src: `assets/medias/${this.photographerName}/${this.media.video}`,
                    type: 'video/mp4'
                }
            }]
        };
    }

    getAllMedias() {
        const mediaCards = Array.from(document.querySelectorAll('.media-card'));
        return mediaCards.map(card => ({
            id: card.dataset.mediaId,
            title: card.querySelector('.media-title').textContent,
            photographerName: this.photographerName,
            image: card.querySelector('img')?.dataset.filename,
            video: card.querySelector('video')?.dataset.filename
        }));
    }

    getCurrentIndex() {
        const mediaCards = Array.from(document.querySelectorAll('.media-card'));
        return mediaCards.findIndex(card => card.dataset.mediaId === this.media.id.toString());
    }

    buildElement({ tag, class: className, attrs, text, children = [], setup }) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (attrs) Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
        if (text) element.textContent = text;
        if (children) children.forEach(child => element.appendChild(this.buildElement(child)));
        if (setup) setup(element);
        return element;
    }
}
