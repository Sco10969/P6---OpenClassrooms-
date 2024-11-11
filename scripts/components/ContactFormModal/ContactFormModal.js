import { ModalManager } from '../../utils/ModalManager.js';

export class ContactFormModal {
    constructor(photographerName) {
        this.photographerName = photographerName;
        this.modal = document.getElementById("contact_modal");
        this.render();
        this.bindEvents();
    }

    open() {
        this.modal.style.display = "flex";
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }

    createFormGroup(labelText, inputType, id) {
        const div = document.createElement('div');
        
        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.textContent = labelText;

        const input = inputType === 'textarea' 
            ? document.createElement('textarea')
            : document.createElement('input');
            
        input.setAttribute('id', id);
        input.setAttribute('name', id);
        input.setAttribute('required', true);
        
        if (inputType !== 'textarea') {
            input.setAttribute('type', inputType);
        }

        div.appendChild(label);
        div.appendChild(input);
        return div;
    }

    render() {
        if (!this.photographerName) {
            console.error('Impossible de rendre la modal sans nom de photographe');
            return;
        }

        // Nettoyer le contenu existant
        this.modal.innerHTML = '';

        // Création de la modal
        const modalDiv = document.createElement('div');
        modalDiv.classList.add('modal');

        // Header
        const header = document.createElement('header');
        
        const title = document.createElement('h2');
        title.textContent = 'Contactez-moi';

        const photographerName = document.createElement('span');
        photographerName.textContent = this.photographerName;
        photographerName.classList.add('photographer-name');
        
        const closeBtn = document.createElement('img');
        closeBtn.src = 'assets/icons/close.svg';
        closeBtn.alt = 'Fermer';
        closeBtn.classList.add('close-btn');
        
        // Création d'un conteneur pour le titre et le nom
        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');
        titleContainer.appendChild(title);
        titleContainer.appendChild(photographerName);
        
        header.appendChild(titleContainer);
        header.appendChild(closeBtn);

        // Form
        const form = document.createElement('form');

        // Création des champs
        const formFields = [
            { label: 'Prénom', type: 'text', id: 'firstName' },
            { label: 'Nom', type: 'text', id: 'lastName' },
            { label: 'Email', type: 'email', id: 'email' },
            { label: 'Message', type: 'textarea', id: 'message' }
        ];

        formFields.forEach(field => {
            form.appendChild(this.createFormGroup(field.label, field.type, field.id));
        });

        // Bouton d'envoi
        const submitBtn = document.createElement('button');
        submitBtn.classList.add('contact_button');
        submitBtn.setAttribute('type', 'submit');
        submitBtn.textContent = 'Envoyer';
        form.appendChild(submitBtn);

        // Assemblage final
        modalDiv.appendChild(header);
        modalDiv.appendChild(form);
        this.modal.appendChild(modalDiv);
    }

    bindEvents() {
        const form = this.modal.querySelector('form');
        const closeBtn = this.modal.querySelector('img[src*="close"]');

        closeBtn.addEventListener('click', () => ModalManager.closeModal());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                ModalManager.closeModal();
            }
        });

        this.modal.querySelector('.modal').addEventListener('click', (e) => {
            e.stopPropagation();
        });

        form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        console.log('Données du formulaire:', {
            photographer: this.photographerName,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            message: formData.get('message')
        });

        ModalManager.closeModal();
    }
} 