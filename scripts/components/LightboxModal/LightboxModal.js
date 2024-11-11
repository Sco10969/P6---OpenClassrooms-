import { ModalManager } from '../../utils/ModalManager.js';

export class LightboxModal {
    constructor(mediaList, currentIndex = 0) {
        this.mediaList = mediaList;
        this.currentIndex = currentIndex;
        this.keyboardListener = this.handleKeyboard.bind(this);
    }

    handleKeyboard(e) {
        const actions = {
            'Escape': () => this.close(),
            'ArrowLeft': () => this.prev(),
            'ArrowRight': () => this.next()
        };
        actions[e.key]?.();
    }

    close() {
        document.body.style.overflow = 'auto';
        this.lightboxElement?.remove();
        document.removeEventListener('keydown', this.keyboardListener);
    }

    prev() {
        this.showMedia((this.currentIndex - 1 + this.mediaList.length) % this.mediaList.length);
    }

    next() {
        this.showMedia((this.currentIndex + 1) % this.mediaList.length);
    }

    showMedia(index) {
        this.currentIndex = index;
        const media = this.mediaList[index];
        this.mediaContainer.innerHTML = '';

        const element = media.image 
            ? this.createImage(media)
            : this.createVideo(media);

        this.mediaContainer.appendChild(element);
        this.title.textContent = media.title;
    }

    createImage(media) {
        const img = document.createElement('img');
        img.src = `assets/medias/${media.photographerName}/${media.image}`;
        img.alt = media.title;
        return img;
    }

    createVideo(media) {
        const video = document.createElement('video');
        Object.assign(video, {
            autoplay: true,
            loop: true,
            muted: true,
            playsInline: true
        });
        
        const source = document.createElement('source');
        source.src = `assets/medias/${media.photographerName}/${media.video}`;
        source.type = 'video/mp4';
        video.appendChild(source);
        return video;
    }

    createButton(className, icon, label) {
        const button = document.createElement('button');
        button.className = className;
        button.setAttribute('aria-label', label);
        
        const img = document.createElement('img');
        img.src = `assets/icons/${icon}`;
        img.alt = '';
        img.setAttribute('aria-hidden', 'true');
        
        button.appendChild(img);
        return button;
    }

    render() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-modal';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-label', 'Visionneuse de média');
        this.lightboxElement = lightbox;

        const content = document.createElement('div');
        content.className = 'lightbox-modal__content';

        const buttons = {
            close: this.createButton('lightbox-modal__close', 'close.svg', 'Fermer la lightbox'),
            prev: this.createButton('lightbox-modal__prev', 'nav_prev.svg', 'Image précédente'),
            next: this.createButton('lightbox-modal__next', 'nav_next.svg', 'Image suivante')
        };

        this.mediaContainer = document.createElement('div');
        this.mediaContainer.className = 'lightbox-modal__media';

        this.title = document.createElement('p');
        this.title.className = 'lightbox-modal__title';

        content.append(
            buttons.close,
            buttons.prev,
            this.mediaContainer,
            buttons.next,
            this.title
        );
        lightbox.appendChild(content);

        buttons.close.addEventListener('click', () => this.close());
        buttons.prev.addEventListener('click', () => this.prev());
        buttons.next.addEventListener('click', () => this.next());
        document.addEventListener('keydown', this.keyboardListener);

        this.showMedia(this.currentIndex);
        return lightbox;
    }
}

