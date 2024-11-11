import { ContactFormModal } from '../components/ContactFormModal/ContactFormModal.js';
import { LightboxModal } from '../components/LightboxModal/LightboxModal.js';

export class ModalManager {
    static MODAL_TYPES = {
        LIGHTBOX: 'lightbox',
        CONTACT: 'contact'
    };

    static activeModal = null;

    static displayModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "block";
    }

    static closeModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
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

            case this.MODAL_TYPES.LIGHTBOX:
                const { mediaList, currentIndex } = props;
                console.log('Creating lightbox with:', { mediaList, currentIndex });
                const lightboxModal = new LightboxModal(mediaList, currentIndex);
                this.activeModal = lightboxModal;
                document.body.appendChild(lightboxModal.render());
                document.body.style.overflow = 'hidden';
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