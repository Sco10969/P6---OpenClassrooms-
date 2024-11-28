import { buildElement } from '../../../utils/dom-utils.js';
import { ModalTemplate } from '../../../utils/modal-template.js';

export class ContactModal extends ModalTemplate {
    constructor(photographerName) {
        const contactContainer = document.querySelector('#contact_modal');
        super('Contact', 'contact-modal', contactContainer);
        this.buildContactForm(photographerName);
    }

    buildContactForm(photographerName) {
        const formStructure = {
            tag: 'form',
            className: 'modal-content',
            children: [
                {
                    tag: 'header',
                    children: [{
                        tag: 'div',
                        className: 'title-container',
                        children: [
                            {
                                tag: 'h2',
                                text: 'Contactez-moi'
                            },
                            {
                                tag: 'span',
                                className: 'photographer-name',
                                text: photographerName
                            }
                        ]
                    }]
                },
                {
                    tag: 'div',
                    className: 'form-fields',
                    children: [
                        { id: 'firstname', label: 'Prénom', type: 'text' },
                        { id: 'lastname', label: 'Nom', type: 'text' },
                        { id: 'email', label: 'Email', type: 'email' },
                        { id: 'message', label: 'Votre message', type: 'textarea' }
                    ].map(field => ({
                        tag: 'div',
                        className: 'formData',
                        children: [
                            {
                                tag: 'label',
                                attrs: { for: field.id },
                                text: field.label
                            },
                            {
                                tag: field.type === 'textarea' ? 'textarea' : 'input',
                                attrs: {
                                    id: field.id,
                                    name: field.id,
                                    type: field.type !== 'textarea' ? field.type : undefined
                                }
                            }
                        ]
                    }))
                },
                {
                    tag: 'button',
                    className: 'contact-button',
                    text: 'Envoyer',
                    attrs: { type: 'submit' }
                }
            ]
        };

        const form = buildElement(formStructure);
        const closeButton = this.createCloseButton();
        form.appendChild(closeButton);

        form.onsubmit = (e) => {
            e.preventDefault();
            if (this.validateForm(form)) {
                this.handleSubmit(form);
                this.close();
            }
        };

        this.setContent(form);
    }

    validateForm(form) {
        const fields = form.querySelectorAll('input, textarea');
        let isValid = true;

        fields.forEach(field => {
            field.parentElement.removeAttribute('data-error-visible');
            
            if (!field.value.trim()) {
                field.parentElement.setAttribute('data-error-visible', 'true');
                isValid = false;
            }
            
            if (field.type === 'email' && !this.isValidEmail(field.value)) {
                field.parentElement.setAttribute('data-error-visible', 'true');
                isValid = false;
            }
        });

        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    handleSubmit(form) {
        const formData = new FormData(form);
        console.log('Form data:', Object.fromEntries(formData.entries()));
    }
}