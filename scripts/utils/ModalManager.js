import { ContactFormModal } from '../components/ContactFormModal/ContactFormModal.js';

export class ModalManager {
    static MODAL_TYPES = {
        LIGHTBOX: 'lightbox',
        CONTACT: 'contact'
    };

    static activeModal = null;

    static displayModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "flex";
        document.body.style.overflow = 'hidden';
    }

    static closeModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }

    static open(modalType, props = {}) {
        if (this.activeModal) {
            this.close();
        }

        switch (modalType) {
            case this.MODAL_TYPES.CONTACT:
                const { photographerName } = props;
                const contactModal = new ContactFormModal(photographerName);
                this.activeModal = contactModal;
                this.displayModal();
                break;
        }
    }

    static close() {
        if (this.activeModal) {
            this.closeModal();
            this.activeModal = null;
        }
    }
} 