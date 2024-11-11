import { LikeButton } from '../LikeButton/LikeButton.js';
import { ModalManager } from '../../utils/ModalManager.js';

export class MediaCard {
    constructor(media, photographerName) {
        this.media = media;
        this.photographerName = photographerName;
    }

    createMediaElement() {
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('media-container');
        mediaContainer.style.cursor = 'pointer';

        if (this.media.image) {
            const img = document.createElement('img');
            img.setAttribute('src', `assets/medias/${this.photographerName}/${this.media.image}`);
            img.setAttribute('alt', this.media.title);
            mediaContainer.appendChild(img);
        } 
        
        if (this.media.video) {
            const video = document.createElement('video');
            video.setAttribute('muted', true);
            video.setAttribute('loop', true);
            video.setAttribute('autoplay', true);
            video.setAttribute('playsinline', true);

            const source = document.createElement('source');
            source.setAttribute('src', `assets/medias/${this.photographerName}/${this.media.video}`);
            source.setAttribute('type', 'video/mp4');
            video.appendChild(source);
            mediaContainer.appendChild(video);
        }

        mediaContainer.addEventListener('click', () => {
            console.log('Media clicked!');
            this.openLightbox();
        });

        return mediaContainer;
    }

    openLightbox() {
        const allMediaCards = Array.from(document.querySelectorAll('.media-card'));
        const allMedias = allMediaCards.map(card => {
            const img = card.querySelector('img');
            const video = card.querySelector('video');
            const title = card.querySelector('.media-info p').textContent;
            
            return {
                image: img ? img.getAttribute('src').split('/').pop() : null,
                video: video ? video.querySelector('source').getAttribute('src').split('/').pop() : null,
                title: title,
                photographerName: this.photographerName
            };
        });

        const currentIndex = allMediaCards.indexOf(this.element);

        ModalManager.open(ModalManager.MODAL_TYPES.LIGHTBOX, {
            mediaList: allMedias,
            currentIndex: currentIndex
        });
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
        const article = document.createElement('article');
        article.classList.add('media-card');
        this.element = article;

        const mediaElement = this.createMediaElement();
        const mediaInfo = this.createMediaInfo();

        article.appendChild(mediaElement);
        article.appendChild(mediaInfo);

        return article;
    }
}
