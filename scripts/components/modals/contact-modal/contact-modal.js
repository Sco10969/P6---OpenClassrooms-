import { ModalManager } from '../../../utils/modal-manager.js';

export class ContactModal {
    constructor(photographerName) {
        // 1. Création de la structure
        const modalElement = document.createElement('div');
        modalElement.className = 'contact_modal';
        modalElement.setAttribute('role', 'dialog');
        modalElement.setAttribute('aria-label', 'Contact Form');

        modalElement.style.display = 'none';

        // 2. Création du contenu
        const content = this.createContent(photographerName);
        modalElement.appendChild(content);

        // 3. Stockage de l'élément
        this.element = modalElement;

        // 4. Ajout au DOM
        document.body.appendChild(modalElement);
    }

    createContent(photographerName) {
        const content = document.createElement('div');
        content.className = 'modal-content modal';

        content.append(
            this.createHeader(photographerName),
            this.createForm()
        );

        return content;
    }

    createHeader(photographerName) {
        const header = document.createElement('header');

        // Wrapper pour le titre et le nom ✨
        const titleContainer = document.createElement('div');
        titleContainer.className = 'title-container';

        // Titre
        const title = document.createElement('h2');
        title.textContent = 'Contactez-moi';

        // Nom du photographe
        const photographerSpan = document.createElement('span');
        photographerSpan.className = 'photographer-name';
        photographerSpan.textContent = photographerName;

        // Bouton fermer
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.setAttribute('aria-label', 'Fermer');

        const closeImg = document.createElement('img');
        closeImg.src = 'assets/icons/close.svg';
        closeImg.alt = '';
        closeBtn.appendChild(closeImg);

        closeBtn.onclick = () => ModalManager.close(this);

        // Ajout du titre et du nom dans le container ✨
        titleContainer.append(title, photographerSpan);

        // Ajout du container et du bouton dans le header ✨
        header.append(titleContainer, closeBtn);
        return header;
    }

    createForm() {
        const form = document.createElement('form');

        const fields = [
            { id: 'firstname', label: 'Prénom', type: 'text' },
            { id: 'lastname', label: 'Nom', type: 'text' },
            { id: 'email', label: 'Email', type: 'email' },
            { id: 'message', label: 'Votre message', type: 'textarea' }
        ];

        fields.forEach(field => {
            const div = document.createElement('div');
            div.className = 'formData';

            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.textContent = field.label;

            const input = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');
            input.id = field.id;
            input.name = field.id;
            if (field.type !== 'textarea') input.type = field.type;

            div.append(label, input);
            form.appendChild(div);
        });

        const submitBtn = document.createElement('button');
        submitBtn.className = 'contact_button';
        submitBtn.textContent = 'Envoyer';
        form.appendChild(submitBtn);

        form.onsubmit = (e) => {
            e.preventDefault();
            console.log('Form submitted');
            ModalManager.close(this);
        };

        return form;
    }
}