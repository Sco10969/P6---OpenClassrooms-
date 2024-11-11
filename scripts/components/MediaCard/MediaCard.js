import { LikeButton } from '../LikeButton/LikeButton.js';
import { ModalManager } from '../../utils/ModalManager.js';

export class MediaCard {
    constructor(media, photographerName) {
        this.media = media;
        this.photographerName = photographerName;
    }

    createMediaElement() {
        if (this.media.image) {
            const img = document.createElement('img');
            img.setAttribute('src', `assets/medias/${this.photographerName}/${this.media.image}`);
            img.setAttribute('alt', this.media.title);
            return img;
        } 
        
        if (this.media.video) {
            const video = document.createElement('video');
            video.setAttribute('muted', true);
            video.setAttribute('loop', true);
            video.setAttribute('autoplay', true);
            video.setAttribute('playsinline', true);
            video.style.pointerEvents = 'none';

            const source = document.createElement('source');
            source.setAttribute('src', `assets/medias/${this.photographerName}/${this.media.video}`);
            source.setAttribute('type', 'video/mp4');
            video.appendChild(source);
            return video;
        }
    }

    createMediaInfo() {
        const figcaption = document.createElement('figcaption');
        figcaption.classList.add('media-info');

        const title = document.createElement('p');
        title.textContent = this.media.title;

        const likeButton = new LikeButton(this.media.id, this.media.likes);
        const likesContainer = likeButton.render();

        figcaption.appendChild(title);
        figcaption.appendChild(likesContainer);

        return figcaption;
    }

    render() {
        const mediaCard = document.createElement('figure');
        mediaCard.classList.add('media-card');

        const mediaElement = this.createMediaElement();
        const mediaInfo = this.createMediaInfo();

        mediaCard.appendChild(mediaElement);
        mediaCard.appendChild(mediaInfo);

        return mediaCard;
    }

    openLightbox() {
        const allMedias = this.getAllMedias();
        const currentIndex = this.getCurrentIndex();
        
        ModalManager.open(ModalManager.MODAL_TYPES.LIGHTBOX, {
            mediaList: allMedias,
            currentIndex: currentIndex
        });
    }
}
