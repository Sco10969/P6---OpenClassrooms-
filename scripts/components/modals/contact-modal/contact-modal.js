import { buildElement } from '../../../utils/dom-utils.js';
import { ModalTemplate } from '../../../utils/modal-template.js';

export class ContactModal extends ModalTemplate {
    constructor(photographerName) {
        super('Contactez-moi', 'contact-modal');
        this.photographerName = photographerName;
        this.buildContactForm(photographerName);
    }

    buildContactForm(photographerName) {
        const formStructure = {
            tag: 'form',
            className: 'modal-content',
            children: [
                {
                    tag: 'div',
                    className: 'modal-header',
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
                        // Création de la structure de chaque champ du formulaire
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
            // Vérification si le champ est vide
            if (!field.value.trim()) {
                field.parentElement.setAttribute('data-error-visible', 'true');
                isValid = false;
            }
            // Vérification si l'email est valide
            if (field.type === 'email' && !this.isValidEmail(field.value)) {
                field.parentElement.setAttribute('data-error-visible', 'true');
                isValid = false;
            }
        });

        return isValid;
    }

    isValidEmail(email) {
        // Vérification si l'email est valide
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Gestion de la soumission du formulaire
    handleSubmit(form) {
        const formData = new FormData(form);
        console.log('Form data:', Object.fromEntries(formData.entries()));
    }
}