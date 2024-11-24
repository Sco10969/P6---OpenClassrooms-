export class ModalTemplate {
    constructor(title, modalType = '', container = null) {
        this.title = title;
        this.isOpen = false;
        this.container = container || document.body;
        this.buildModal(modalType);
    }

    buildModal(modalType) {
        // Structure de base comme dans Liquid
        const modalStructure = {
            tag: 'div',
            class: `modal ${modalType}`,
            attrs: { role: 'dialog' },
            style: { display: 'none' },
            children: [{
                tag: 'div',
                class: 'modal-wrapper',
                children: [{
                    tag: 'div',
                    class: 'modal-wrapper-content',
                    children: this.title ? [{
                        tag: 'h2',
                        class: 'modal-title',
                        text: this.title
                    }] : []
                }]
            }]
        };

        this.modal = this.buildElement(modalStructure);
        this.container.appendChild(this.modal);

        // Fermeture au clic en dehors
        this.modal.onclick = e => {
            if (e.target === this.modal) this.close();
        };
        
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.close();
        });
    }

    buildElement({ tag, class: className, style, attrs, text, children = [] }) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (style) Object.assign(element.style, style);
        if (attrs) Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
        if (text) element.textContent = text;
        children.forEach(child => element.appendChild(this.buildElement(child)));
        return element;
    }

    createCloseButton() {
        const closeButton = this.buildElement({
            tag: 'button',
            class: 'modal-close',
            attrs: { 'aria-label': 'Fermer' },
            children: [{
                tag: 'img',
                attrs: { src: 'assets/icons/close.svg', alt: '' }
            }]
        });
        
        closeButton.onclick = () => this.close();
        return closeButton;
    }

    setContent(content) {
        const contentWrapper = this.modal.querySelector('.modal-wrapper-content');
        contentWrapper.innerHTML = '';
        contentWrapper.appendChild(content);
    }

    open() {
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal !== this.modal) modal.remove();
        });

        this.isOpen = true;
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.querySelector('main').setAttribute('inert', '');
    }

    close() {
        this.isOpen = false;
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.querySelector('main').removeAttribute('inert');
    }
}
