import { ModalManager } from '../../../utils/modal-manager.js';

export class LightboxModal {
    constructor(params) {
        // 1. Création de la structure
        const modalElement = document.createElement('div');
        modalElement.className = 'lightbox-modal';
        modalElement.setAttribute('role', 'dialog');
        modalElement.setAttribute('aria-label', 'Image Viewer');

        // 2. Création du contenu
        const content = this.createContent();
        modalElement.appendChild(content);

        // 3. Stockage des références
        this.element = modalElement;
        this.mediaContainer = content.querySelector('.lightbox-media');
        this.title = content.querySelector('.lightbox-title');
        
        // 4. Initialisation avec les paramètres
        if (params && params.mediaList) {
            this.mediaList = params.mediaList;
            this.currentIndex = params.currentIndex || 0;
            this.showMedia(this.currentIndex);
        }

        // 5. Ajout au DOM
        document.body.appendChild(modalElement);

        // 6. Configuration des événements
        this.setupEvents();
    }

    setupEvents() {
        // Navigation clavier
        this.keyboardHandler = (e) => {
            switch(e.key) {
                case 'ArrowLeft': 
                    e.preventDefault();
                    this.prev(); 
                    break;
                case 'ArrowRight': 
                    e.preventDefault();
                    this.next(); 
                    break;
            }
        };
        
        // Gestion du focus
        this.element.setAttribute('tabindex', '-1');
        this.element.focus();
        
        document.addEventListener('keydown', this.keyboardHandler);
    }

    createContent() {
        const content = document.createElement('div');
        content.className = 'modal-content lightbox-content';

        content.append(
            this.createCloseButton(),
            this.createNavigation('prev'),
            this.createMediaContainer(),
            this.createNavigation('next'),
            this.createTitle()
        );

        return content;
    }

    createCloseButton() {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.setAttribute('aria-label', 'Fermer');

        const closeImg = document.createElement('img');
        closeImg.src = 'assets/icons/close.svg';
        closeImg.alt = '';

        closeBtn.appendChild(closeImg);
        closeBtn.onclick = () => ModalManager.close(this);

        return closeBtn;
    }

    createNavigation(direction) {
        const button = document.createElement('button');
        button.className = `lightbox-${direction}`;
        button.setAttribute('aria-label', direction === 'prev' ? 'Image précédente' : 'Image suivante');

        const img = document.createElement('img');
        img.src = `assets/icons/nav_${direction}.svg`;
        img.alt = '';

        button.appendChild(img);
        button.onclick = () => this[direction]();

        return button;
    }

    createMediaContainer() {
        const container = document.createElement('div');
        container.className = 'lightbox-media';
        return container;
    }

    createTitle() {
        const title = document.createElement('h2');
        title.className = 'lightbox-title';
        return title;
    }

    showMedia(index) {
        console.log('📸 Tentative d\'affichage du média:', index);
        console.log('📑 Liste des médias disponibles:', this.mediaList);

        // Vérification de l'index
        if (index < 0 || index >= this.mediaList.length) {
            console.error(`❌ Index invalide: ${index}. Utilisation de l'index 0.`);
            index = 0;
        }

        this.currentIndex = index;
        const media = this.mediaList[index];

        if (!media) {
            console.error('❌ Média non trouvé pour l\'index:', index);
            return;
        }

        console.log('🖼️ Affichage du média:', media);

        // ✨ Nettoyer complètement le conteneur
        this.mediaContainer.innerHTML = '';

        if (media.image) {
            const img = document.createElement('img');
            img.src = `assets/medias/${media.photographerName}/${media.image}`;
            img.alt = media.title;
            this.mediaContainer.appendChild(img);
        } else if (media.video) {
            const video = document.createElement('video');
            video.controls = true;
            
            const source = document.createElement('source');
            source.src = `assets/medias/${media.photographerName}/${media.video}`;
            source.type = 'video/mp4';
            
            video.appendChild(source);
            this.mediaContainer.appendChild(video);
        }

        // ✨ Mettre à jour le titre
        this.title.textContent = media.title;
        
        console.log('✅ Média affiché avec succès');
    }

    prev() {
        const newIndex = (this.currentIndex - 1 + this.mediaList.length) % this.mediaList.length;
        this.showMedia(newIndex);
    }

    next() {
        const newIndex = (this.currentIndex + 1) % this.mediaList.length;
        this.showMedia(newIndex);
    }

    setMediaList(mediaList) {
        this.mediaList = mediaList;
    }

    // Ajout de la méthode de gestion du focus ✨
    handleTabKey(e) {
        if (e.key === 'Tab') {
            const focusableElements = this.element.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    }

    // ✨ Nouvelle méthode pour réinitialiser l'état
    reset(params) {
        if (params && params.mediaList) {
            this.mediaList = params.mediaList;
            this.currentIndex = params.currentIndex || 0;
            this.showMedia(this.currentIndex);
        }
    }

    // ✨ Mise à jour de la méthode close
    close() {
        // Nettoyage des événements
        document.removeEventListener('keydown', this.keyboardHandler);
        
        // Nettoyage du contenu
        this.mediaContainer.innerHTML = '';
        this.title.textContent = '';
        this.currentIndex = 0;
        this.mediaList = [];
    }
}

