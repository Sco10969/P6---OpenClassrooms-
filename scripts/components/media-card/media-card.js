import { LikeButton } from '../like-button/like-button.js';
import { ModalManager } from '../../utils/modal-manager.js';

export class MediaCard {
    constructor(media, photographerName) {
        this.media = media;
        this.photographerName = photographerName;
    }

    createInfoSection() {
        const infoSection = document.createElement('div');
        infoSection.className = 'media-info';

        const title = document.createElement('span');
        title.className = 'media-title';
        title.textContent = this.media.title;

        const likeButton = new LikeButton(this.media.id, this.media.likes);
        const likesContainer = likeButton.render();

        infoSection.append(title, likesContainer);

        return infoSection;
    }

    render() {
        const article = document.createElement('article');
        article.className = 'media-card';
        article.dataset.mediaId = this.media.id;

        const mediaWrapper = document.createElement('div');
        mediaWrapper.className = 'media-wrapper';
        mediaWrapper.onclick = () => this.openLightbox();

        let mediaElement;

        if (this.media.image) {
            mediaElement = document.createElement('img');
            mediaElement.src = `assets/medias/${this.photographerName}/${this.media.image}`;
            mediaElement.alt = this.media.title;
            mediaElement.dataset.filename = this.media.image;
        } else if (this.media.video) {
            mediaElement = document.createElement('video');
            mediaElement.autoplay = true;
            mediaElement.loop = true;
            mediaElement.muted = true;
            mediaElement.playsInline = true;

            const source = document.createElement('source');
            source.src = `assets/medias/${this.photographerName}/${this.media.video}`;
            source.type = 'video/mp4';
            mediaElement.appendChild(source);
            mediaElement.dataset.filename = this.media.video;
        }

        mediaWrapper.appendChild(mediaElement);
        article.append(mediaWrapper, this.createInfoSection());

        return article;
    }

    openLightbox() {
        const mediaSection = document.querySelector('.media_section');
        const allMediaCards = Array.from(mediaSection.querySelectorAll('.media-card'));
 
        const allMedias = new Map(allMediaCards.map(card => {
            const mediaElement = card.querySelector('img, video');
            const titleElement = card.querySelector('.media-title');
            const mediaId = card.dataset.mediaId;

            return [mediaId, {
                id: mediaId,
                title: titleElement.textContent,
                image: mediaElement.tagName === 'IMG' ? mediaElement.dataset.filename : null,
                video: mediaElement.tagName === 'VIDEO' ? mediaElement.dataset.filename : null,
                photographerName: this.photographerName
            }];
        }));

        const currentIndex = Array.from(allMedias.keys()).indexOf(this.media.id.toString());

        ModalManager.open('lightbox', {
            mediaList: Array.from(allMedias.values()),
            currentIndex: Math.max(0, currentIndex)
        });
    }
}
