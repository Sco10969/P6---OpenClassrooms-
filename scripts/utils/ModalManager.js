import { LightboxModal } from '../components/LightboxModal/LightboxModal.js';
import { ContactFormModal } from '../components/ContactFormModal/ContactFormModal.js';

export class ModalManager {
    static MODAL_TYPES = {
        LIGHTBOX: 'lightbox',
        CONTACT: 'contact'
    };

    static activeModal = null;

    static open(modalType, props = {}) {
        if (this.activeModal) {
            this.close();
        }

        switch (modalType) {
            case this.MODAL_TYPES.CONTACT:
                const { photographerName } = props;
                const contactModal = new ContactFormModal(photographerName);
                const modalElement = contactModal.render();
                document.body.appendChild(modalElement);
                document.body.style.overflow = 'hidden';
                this.activeModal = contactModal;
                break;

            case this.MODAL_TYPES.LIGHTBOX:
                const { mediaList, currentIndex } = props;
                const lightboxModal = new LightboxModal(mediaList, currentIndex);
                document.body.appendChild(lightboxModal.render());
                document.body.style.overflow = 'hidden';
                this.activeModal = lightboxModal;
                break;
        }
    }

    static close() {
        if (this.activeModal) {
            if (this.activeModal instanceof ContactFormModal) {
                this.activeModal.close();
            } else if (this.activeModal instanceof LightboxModal) {
                this.activeModal.close();
            }
            document.body.style.overflow = 'auto';
            this.activeModal = null;
        }
    }
} 