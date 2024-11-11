import { ModalManager } from '../../utils/ModalManager.js';

export class LightboxModal {
    constructor(mediaList, currentIndex = 0) {
        this.mediaList = mediaList;
        this.currentIndex = currentIndex;
    }

    bindEvents() {
        this.modal.querySelector('.lightbox-modal__close')
            .addEventListener('click', () => ModalManager.close());

        // Navigation
        this.modal.querySelector('.lightbox-modal__prev')
            .addEventListener('click', () => this.prev());
        this.modal.querySelector('.lightbox-modal__next')
            .addEventListener('click', () => this.next());
    }

    showMedia(index) {
        const media = this.mediaList[index];
        this.content.innerHTML = '';
        this.title.textContent = media.title;

        if (media.image) {
            const img = document.createElement('img');
            img.src = `assets/medias/${media.photographerName}/${media.image}`;
            img.alt = media.title;
            this.content.appendChild(img);
        } else if (media.video) {
            const video = document.createElement('video');
            video.controls = true;
            const source = document.createElement('source');
            source.src = `assets/medias/${media.photographerName}/${media.video}`;
            source.type = 'video/mp4';
            video.appendChild(source);
            this.content.appendChild(video);
        }
    }

    open(index = this.currentIndex) {
        if (!this.modal) {
            document.body.appendChild(this.createModal());
        }
        this.currentIndex = index;
        this.showMedia(index);
    }

    close() {
        this.modal.remove();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.mediaList.length;
        this.showMedia(this.currentIndex);
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.mediaList.length) % this.mediaList.length;
        this.showMedia(this.currentIndex);
    }
}
