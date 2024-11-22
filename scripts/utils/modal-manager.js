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
        if (modalConstructors.has(modalId)) {
            console.error(`Une modal avec l'ID ${modalId} est déjà enregistrée`);
            return;
        }
        modalConstructors.set(modalId, ModalClass);
    },

    /**
     * Ouvre ou crée une modal spécifique
     * @param {string} modalId - Identifiant de la modal à ouvrir
     * @param {Object} params - Paramètres pour le constructeur de la modal
     */
    open(modalId, params = {}) {
        // Fermer toutes les modals ouvertes
        this.closeAll();

        // Créer une nouvelle instance
        const ModalClass = modalConstructors.get(modalId);

        // Supprimer l'ancienne instance si elle existe
        const existingModalIndex = modals.findIndex(modal => modal.id === modalId);
        if (existingModalIndex !== -1) {
            const oldModal = modals[existingModalIndex];
            if (oldModal.element) {
                oldModal.element.remove(); // Nettoyer le DOM
            }
            modals.splice(existingModalIndex, 1);
        }

        // Créer et configurer la nouvelle instance
        const instance = new ModalClass(params);
        const modalToOpen = {
            id: modalId,
            element: instance.element,
            instance: instance,
            isOpen: false
        };

        modals.push(modalToOpen);

        // Configurer l'affichage
        modalToOpen.element.style.display = "flex";
        modalToOpen.element.style.justifyContent = "center";
        modalToOpen.element.style.alignItems = "center";
        modalToOpen.isOpen = true;
        document.body.style.overflow = "hidden";

        this.addListeners(modalToOpen);
    },

    /**
     * Ferme une modal spécifique
     * @param {Object} modal - La modal à fermer
     */
    close(modal) {
        if (!modal?.element) return;

        // Appeler la méthode close de l'instance si elle existe
        if (modal.instance && typeof modal.instance.close === 'function') {
            modal.instance.close();
        }

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
    }
};

// Exposer pour le debug
window.ModalManager = ModalManager;
window.getModals = () => console.log(modals); // Pour voir les modales enregistrées 