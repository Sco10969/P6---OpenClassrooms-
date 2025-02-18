import { buildElement } from '../../utils/dom-utils.js';
import { LikeButton } from '../like-button/like-button.js';
import { LightboxModal } from '../modals/lightbox-modal/lightbox-modal.js';

export class MediaCard {
    constructor(media, photographerName, lightbox) {
        // media contient soit { image: "photo.jpg" }
        // soit { video: "video.mp4" }
        this.media = media;
        this.photographerName = photographerName;
        this.lightbox = lightbox;
    }

    render() {
        // Structure de la carte média
        const cardStructure = {
            tag: 'article',
            className: 'media-card',
            attrs: { 'data-media-id': this.media.id },
            children: [
                // Media Wrapper
                {
                    tag: 'div',
                    className: 'media-wrapper',
                    children: [this.getMediaStructure()]
                },
                // Info Section
                {
                    tag: 'div',
                    className: 'media-info',
                    children: [
                        {
                            tag: 'span',
                            className: 'media-title',
                            text: this.media.title
                        },
                        {
                            tag: 'div',
                            className: 'likes-container',
                            setup: element => {
                                const likeButton = new LikeButton(this.media.id, this.media.likes);
                                element.appendChild(likeButton.render());
                            }
                        }
                    ]
                }
            ]
        };

        const card = buildElement(cardStructure);

        
        // Event pour la lightbox
        const openMedia = () => {
            // Récupération de toutes les cartes média
            this.lightbox.mediaList = this.getAllMedias();
            // Ouverture de la lightbox avec la carte média et l'index
            this.lightbox.open(this.media, this.getCurrentIndex());
        };

        const cardWrapper = card.querySelector('.media-wrapper');
        cardWrapper.tabIndex = 0;
        cardWrapper.addEventListener('keydown', (event) => {
            // Ouverture de la lightbox avec la carte média et l'index
            if (event.key === 'Enter' || event.key === ' ') {
                openMedia();
            }
        });

        // Ouverture de la lightbox avec la carte média et l'index
        cardWrapper.onclick = openMedia;



        return card;
    }

    getMediaStructure() {
        // Structure de l'image ou du vidéo
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
        // Récupération de toutes les cartes média
        if (!this.mediaList) {
            const mediaCards = Array.from(document.querySelectorAll('.media-card'));
            // Création de la liste des médias
            this.mediaList = mediaCards.map(card => ({
                id: card.dataset.mediaId,
                title: card.querySelector('.media-title').textContent,
                photographerName: this.photographerName,
                image: card.querySelector('img')?.dataset.filename,
                video: card.querySelector('video')?.dataset.filename
            }));
        }
        return this.mediaList;
    }

    getCurrentIndex() {
        // Récupération de l'index de la carte média actuelle
        const mediaCards = Array.from(document.querySelectorAll('.media-card'));
        return mediaCards.findIndex(card => card.dataset.mediaId === this.media.id.toString());
    }

}
