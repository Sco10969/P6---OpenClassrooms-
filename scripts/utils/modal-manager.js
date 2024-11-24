export class ModalGeneric {
    constructor(title, parent) {
        this.title = title;
        this.parent = parent;
        this.isOpen = false;
        this.element = this.createModalStructure();
        this.contentContainer = this.element.querySelector('.modal-wrapper-content');
        this.addListeners();
    }

    createModalStructure() {
        const modal = document.createElement('div');
        const overlay = document.createElement('div');
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const close = document.createElement('button');

        modal.className = 'modal';
        overlay.className = 'modal-overlay';
        wrapper.className = 'modal-wrapper';
        content.className = 'modal-wrapper-content';
        close.className = 'modal-close';

        if (this.title) {
            const titleEl = document.createElement('h2');
            titleEl.className = 'modal-title';
            titleEl.textContent = this.title;
            content.appendChild(titleEl);
        }

        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.setAttribute('aria-label', 'Fermer');
        closeBtn.src = 'assets/icons/close.svg';

        wrapper.appendChild(content);
        wrapper.appendChild(close);
        modal.appendChild(overlay);
        modal.appendChild(wrapper);
        
        this.parent.appendChild(modal);
        return modal;
    }

    addListeners() {
        const closeModal = () => this.close();

        this.element.querySelector('.modal-close').addEventListener('click', closeModal);
        this.element.querySelector('.modal-overlay').addEventListener('click', closeModal);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this.isOpen) closeModal();
        });
    }

    open() {
        this.isOpen = true;
        this.element.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.element.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    setContent(content) {
        const container = this.contentContainer;
        container.innerHTML = '';
        
        if (this.title) {
            const title = document.createElement('h2');
            title.className = 'modal-title';
            title.textContent = this.title;
            container.appendChild(title);
        }
    }
}


























// Notre tableau de modals et leurs constructeurs
const modalConstructors = new Map();
const modals = [];

// Objet ModalManager qui regroupe toutes les fonctions
export const ModalManager = {
    /**
     * Enregistre un constructeur de modal
     * @param {string} modalId - Identifiant unique de la modal
     * @param {Function} ModalClass - Constructeur de la modal
     */
    register(modalId, ModalClass) {
        modalConstructors.set(modalId, ModalClass);
    },

    /**
     * Ouvre ou crée une modal spécifique
     * @param {string} modalId - Identifiant de la modal à ouvrir
     * @param {Object} params - Paramètres pour le constructeur de la modal
     */
    open(modalId, params = {}) {
        this.closeAll();
        
        const ModalClass = modalConstructors.get(modalId);
        const instance = new ModalClass(params);
        
        const modalToOpen = {
            id: modalId,
            element: instance.element,
            instance: instance,
            isOpen: true
        };

        // Ajouter le bouton close
        const modalContent = modalToOpen.element.querySelector('.modal-content');
        if (modalContent) {
            modalContent.insertAdjacentElement('afterbegin', this.createCloseButton(modalToOpen));
        }

        // Configurer l'affichage
        modalToOpen.element.style.display = "flex";
        document.body.style.overflow = "hidden";

        modals.push(modalToOpen);
        this.addListeners(modalToOpen);
    },

    /**
     * Ferme une modal spécifique
     * @param {Object} modal - La modal à fermer
     */
    close(modal) {
        if (!modal?.element) return;
        modal.element.style.display = "none";
        modal.isOpen = false;
        document.body.style.overflow = "auto";
        this.removeListeners(modal);
    },

    /**
     * Ferme toutes les modals ouvertes
     */
    closeAll() {
        modals.forEach(modal => {
            if (modal.isOpen) {
                this.close(modal);
            }
        });
        document.body.style.overflow = "auto";
    },

    /**
     * Ajoute les écouteurs d'événements à une modal
     * @param {Object} modal - La modal concernée
     */
    addListeners(modal) {
        // Gestionnaire pour la touche Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') this.close(modal);
        };

        // Gestionnaire pour le clic extérieur
        const handleOutsideClick = (e) => {
            const contentElement = modal.element.querySelector('.modal-content');
            if (contentElement && !contentElement.contains(e.target)) {
                this.close(modal);
            }
        };

        // Stocke les références des listeners
        modal.listeners = {
            escape: handleEscape,
            outside: handleOutsideClick
        };

        document.addEventListener('keydown', handleEscape);
        modal.element.addEventListener('click', handleOutsideClick);
    },

    /**
     * Retire les écouteurs d'événements d'une modal
     * @param {Object} modal - La modal concernée
     */
    removeListeners(modal) {
        if (!modal.listeners) return;

        document.removeEventListener('keydown', modal.listeners.escape);
        modal.element.removeEventListener('click', modal.listeners.outside);
        modal.listeners = null;
    },

    /**
     * Supprime une modal du manager
     * @param {string} modalId - Identifiant de la modal à supprimer
     */
    destroy(modalId) {
        const modalIndex = modals.findIndex(modal => modal.id === modalId);
        if (modalIndex === -1) return;

        const modal = modals[modalIndex];
        if (modal.isOpen) {
            this.close(modal);
        }
        modals.splice(modalIndex, 1);
    },

    /**
     * Crée un bouton de fermeture pour une modal
     * @param {Object} modal - La modal concernée
     * @returns {HTMLElement} - Le bouton de fermeture créé
     */
    createCloseButton(modal) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.setAttribute('aria-label', 'Fermer');

        const closeImg = document.createElement('img');
        closeImg.src = 'assets/icons/close.svg';
        closeImg.alt = '';

        closeBtn.appendChild(closeImg);
        closeBtn.onclick = () => this.close(modal);

        return closeBtn;
    }
};
// debug
window.ModalManager = ModalManager;
window.getModals = () => console.log(modals); // Pour voir les modales enregistrées 
