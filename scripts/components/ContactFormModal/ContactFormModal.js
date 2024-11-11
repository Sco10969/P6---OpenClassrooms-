import { ModalManager } from '../../utils/ModalManager.js';

export class ContactFormModal {
    constructor(photographerName) {
        this.photographerName = photographerName;
        this.modalElement = null;
        this.form = null;
    }

    validateField(input) {
        const value = input.value.trim();
        
        switch(input.id) {
            case 'firstname':
            case 'lastname':
                return value.length >= 2;
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            case 'message':
                return value.length >= 10;
            default:
                return false;
        }
    }

    showError(input) {
        const formData = input.parentElement;
        formData.setAttribute('data-error-visible', 'true');
        input.classList.add('error');
    }

    hideError(input) {
        const formData = input.parentElement;
        formData.setAttribute('data-error-visible', 'false');
        input.classList.remove('error');
    }

    validateForm(e) {
        e.preventDefault();
        let isValid = true;
        const inputs = this.form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                this.showError(input);
                isValid = false;
            } else {
                this.hideError(input);
            }
        });

        if (isValid) {
            // Log des données du formulaire
            const formData = {};
            inputs.forEach(input => {
                formData[input.id] = input.value;
            });
            console.log('Form Data:', formData);
            
            // Fermeture de la modal
            ModalManager.close();
        }
    }

    close() {
        this.modalElement?.remove();
    }

    render() {
        const modal = document.createElement('div');
        modal.className = 'contact_modal';
        this.modalElement = modal;

        const content = document.createElement('div');
        content.className = 'modal';

        // Header
        const header = document.createElement('header');
        
        // Container pour le titre et le nom
        const titleContainer = document.createElement('div');
        titleContainer.className = 'title-container';

        const title = document.createElement('h2');
        title.textContent = 'Contactez-moi';
        
        const photographerName = document.createElement('span');
        photographerName.textContent = this.photographerName;
        photographerName.classList.add('photographer-name');

        // Assemblage du container titre
        titleContainer.append(title, photographerName);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.setAttribute('aria-label', 'Fermer le formulaire');
        const closeImg = document.createElement('img');
        closeImg.src = 'assets/icons/close.svg';
        closeImg.alt = '';
        closeBtn.appendChild(closeImg);

        // Assemblage du header
        header.append(titleContainer, closeBtn);

        // Form
        const form = document.createElement('form');
        this.form = form;
        form.setAttribute('name', 'contact');
        form.setAttribute('action', '#');
        form.setAttribute('method', 'get');

        // Ajout des champs du formulaire
        const fields = [
            { label: 'Prénom', type: 'text', id: 'firstname', error: 'Veuillez entrer 2 caractères ou plus' },
            { label: 'Nom', type: 'text', id: 'lastname', error: 'Veuillez entrer 2 caractères ou plus' },
            { label: 'Email', type: 'email', id: 'email', error: 'Veuillez entrer un email valide' },
            { label: 'Votre message', type: 'textarea', id: 'message', error: 'Veuillez entrer au moins 10 caractères' }
        ];

        fields.forEach(field => {
            const div = document.createElement('div');
            div.className = 'formData';
            
            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.textContent = field.label;
            
            const input = field.type === 'textarea' 
                ? document.createElement('textarea') 
                : document.createElement('input');
            
            input.id = field.id;
            input.name = field.id;
            if (field.type !== 'textarea') {
                input.type = field.type;
            }
            
            // Ajout du message d'erreur
            const error = document.createElement('span');
            error.className = 'error-msg';
            error.textContent = field.error;
            
            div.append(label, input, error);
            form.appendChild(div);
        });

        const submitBtn = document.createElement('button');
        submitBtn.className = 'contact_button';
        submitBtn.textContent = 'Envoyer';
        form.appendChild(submitBtn);

        content.append(header, form);
        modal.appendChild(content);

        // Events
        closeBtn.addEventListener('click', () => ModalManager.close());
        form.addEventListener('submit', (e) => this.validateForm(e));

        return modal;
    }
} 