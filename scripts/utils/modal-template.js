import { buildElement } from '../utils/dom-utils.js';

export class ModalTemplate {
    constructor(title, modalType = '', container = null) {
        this.title = title;
        this.isOpen = false;
        this.container = container || document.body;
        this.buildModal(modalType);
        console.log(title);
    }

    buildModal(modalType) {
        // Crée la structure de la modale
        const modalStructure = {
            tag: 'div',
            className: `modal ${modalType}`,
            attrs: { role: 'dialog' },
            style: { display: 'none' },
            children: [{
                tag: 'div',
                className: 'modal-wrapper',
                children: [{
                    tag: 'div',
                    className: 'modal-wrapper-content',
                    children: this.title ? [{
                        tag: 'h2',
                        className: 'modal-title',
                        text: this.title
                    }] : []
                }]
            }]
        };

        this.modal = buildElement(modalStructure);
        this.container?.appendChild(this.modal);

        // Ferme la modale en cliquant à l'extérieur
        this.modal.onclick = e => {
            if (e.target === this.modal) this.close();
        };
        
        // Ferme la modale avec la touche Échap
        this.modal.querySelector('.modal-wrapper').addEventListener('keydown', e => {
            // if (this.modal.querySelector('.modal-wrapper-content').contains(e.target)) {
            //     e.stopPropagation();
            //     return;
            // }
            if (e.key === 'Escape') this.close();
        });
    }

    createCloseButton() {
        // Crée un bouton de fermeture pour la modale
        const closeButton = buildElement({
            tag: 'button',
            className: 'modal-close',
            attrs: { 'aria-label': 'Fermer' },
            children: [{
                tag: 'img',
                attrs: { src: 'assets/icons/close.svg', alt: 'Fermer la modale' }
            }]
        });

        closeButton.onclick = () => this.close();
        return closeButton;
    }

    setContent(content) {
        // Remplace le contenu de la modale
        const contentWrapper = this.modal.querySelector('.modal-wrapper-content');
        contentWrapper.innerHTML = '';
        contentWrapper.appendChild(content);
    }

    open() {
        if (this.isOpen) return;
        // Ouvre la modale
        this.isOpen = true;
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.querySelector('main').setAttribute('inert', '');
        this.modal.querySelector('.modal-wrapper').focus();
    }

    close() {
        if (!this.isOpen) return;
        console.log('close');
        // Ferme la modale
        this.isOpen = false;
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.querySelector('main').removeAttribute('inert');
    }
}
