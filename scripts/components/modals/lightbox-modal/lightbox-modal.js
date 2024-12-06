import { buildElement } from '../../../utils/dom-utils.js';
import { ModalTemplate } from '../../../utils/modal-template.js';

export class LightboxModal extends ModalTemplate {
    constructor() {
        super('Galerie', 'lightbox-modal');
        this.mediaList = [];
        this.currentIndex = 0;
        this.buildLightbox();
    }

    buildLightbox() {
        const lightboxStructure = {
            tag: 'div',
            className: 'modal-content lightbox-content',
            children: [
                // Wrapper pour le contenu
                {
                    tag: 'div',
                    className: 'lightbox-wrapper',
                    children: [
                        // Bouton précédent
                        {
                            tag: 'button',
                            className: 'lightbox-prev',
                            attrs: { 'aria-label': 'Image précédente' },
                            children: [{
                                tag: 'img',
                                attrs: {
                                    src: 'assets/icons/nav_prev.svg',
                                    alt: ''
                                }
                            }]
                        },
                        // Container média
                        {
                            tag: 'div',
                            className: 'lightbox-media'
                        },
                        // Bouton suivant
                        {
                            tag: 'button',
                            className: 'lightbox-next',
                            attrs: { 'aria-label': 'Image suivante' },
                            children: [{
                                tag: 'img',
                                attrs: {
                                    src: 'assets/icons/nav_next.svg',
                                    alt: ''
                                }
                            }]
                        },
                        // Titre
                        {
                            tag: 'h2',
                            className: 'lightbox-title'
                        }
                    ]
                }
            ]
        };

        const content = buildElement(lightboxStructure);
        const closeButton = this.createCloseButton();
        content.appendChild(closeButton);

        // Stockage des références
        this.mediaContainer = content.querySelector('.lightbox-media');
        this.title = content.querySelector('.lightbox-title');

        // Events de navigation
        content.querySelector('.lightbox-prev').onclick = () => this.prev();
        content.querySelector('.lightbox-next').onclick = () => this.next();

        // Navigation clavier
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // IMPORTANT: ajout du contenu à la modale
        this.setContent(content);
    }

    open(media, index) {
        super.open();
        this.currentIndex = index;
        this.showMedia(index);
    }

    showMedia(index) {
        if (index < 0 || index >= this.mediaList.length) {
            index = 0;
        }

        this.currentIndex = index;
        const media = this.mediaList[index];

        this.mediaContainer.innerHTML = '';

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
            video.controls = false;
            video.playsInline = true;

            const source = document.createElement('source');
            source.src = `assets/medias/${media.photographerName}/${media.video}`;
            source.type = 'video/mp4';

            video.appendChild(source);
            this.mediaContainer.appendChild(video);
        }

        this.title.textContent = media.title;
    }

    prev() {
        const newIndex = (this.currentIndex - 1 + this.mediaList.length) % this.mediaList.length;
        this.showMedia(newIndex);
    }

    next() {
        const newIndex = (this.currentIndex + 1) % this.mediaList.length;
        this.showMedia(newIndex);
    }

    close() {
        super.close();
    }
}

