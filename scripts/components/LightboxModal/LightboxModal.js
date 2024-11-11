import { ModalManager } from '../../utils/ModalManager.js';

export class LightboxModal {
    constructor(mediaList, currentIndex = 0) {
        this.mediaList = mediaList;
        this.currentIndex = currentIndex;
        this.keyboardListener = this.handleKeyboard.bind(this);
    }

    handleKeyboard(e) {
        switch(e.key) {
            case 'Escape': 
                this.close();
                break;
            case 'ArrowLeft': 
                this.prev();
                break;
            case 'ArrowRight': 
                this.next();
                break;
        }
    }

    close() {
        document.body.style.overflow = 'auto';
        this.lightboxElement?.remove();
        document.removeEventListener('keydown', this.keyboardListener);
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.mediaList.length) % this.mediaList.length;
        this.showMedia(this.currentIndex);
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.mediaList.length;
        this.showMedia(this.currentIndex);
    }

    showMedia(index) {
        const media = this.mediaList[index];
        
        while (this.mediaContainer.firstChild) {
            this.mediaContainer.removeChild(this.mediaContainer.firstChild);
        }

        if (media.image) {
            const img = document.createElement('img');
            img.src = `assets/medias/${media.photographerName}/${media.image}`;
            img.alt = media.title;
            this.mediaContainer.appendChild(img);
        } else if (media.video) {
            const video = document.createElement('video');
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.setAttribute('aria-label', media.title);
            
            const source = document.createElement('source');
            source.src = `assets/medias/${media.photographerName}/${media.video}`;
            source.type = 'video/mp4';
            
            video.appendChild(source);
            this.mediaContainer.appendChild(video);
        }

        // Mise à jour du titre
        const titleText = document.createTextNode(media.title);
        while (this.title.firstChild) {
            this.title.removeChild(this.title.firstChild);
        }
        this.title.appendChild(titleText);
    }

    render() {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox-modal');
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-label', 'Visionneuse de média');
        this.lightboxElement = lightbox;

        const content = document.createElement('div');
        content.classList.add('lightbox-modal__content');

        // Bouton Close
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('lightbox-modal__close');
        closeBtn.setAttribute('aria-label', 'Fermer la lightbox');
        const closeImg = document.createElement('img');
        closeImg.src = 'assets/icons/close.svg';
        closeImg.alt = '';
        closeImg.setAttribute('aria-hidden', 'true');
        closeBtn.appendChild(closeImg);

        // Bouton Previous
        const prevBtn = document.createElement('button');
        prevBtn.classList.add('lightbox-modal__prev');
        prevBtn.setAttribute('aria-label', 'Image précédente');
        const prevImg = document.createElement('img');
        prevImg.src = 'assets/icons/nav_prev.svg';
        prevImg.alt = '';
        prevImg.setAttribute('aria-hidden', 'true');
        prevBtn.appendChild(prevImg);

        // Bouton Next
        const nextBtn = document.createElement('button');
        nextBtn.classList.add('lightbox-modal__next');
        nextBtn.setAttribute('aria-label', 'Image suivante');
        const nextImg = document.createElement('img');
        nextImg.src = 'assets/icons/nav_next.svg';
        nextImg.alt = '';
        nextImg.setAttribute('aria-hidden', 'true');
        nextBtn.appendChild(nextImg);

        // Conteneur média
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('lightbox-modal__media');
        this.mediaContainer = mediaContainer;

        // Titre
        const title = document.createElement('p');
        title.classList.add('lightbox-modal__title');
        this.title = title;

        // Assemblage
        content.appendChild(closeBtn);
        content.appendChild(prevBtn);
        content.appendChild(mediaContainer);
        content.appendChild(nextBtn);
        content.appendChild(title);
        lightbox.appendChild(content);

        // Événements
        closeBtn.addEventListener('click', () => this.close());
        prevBtn.addEventListener('click', () => this.prev());
        nextBtn.addEventListener('click', () => this.next());
        document.addEventListener('keydown', this.keyboardListener);

        this.showMedia(this.currentIndex);

        return lightbox;
    }
}

