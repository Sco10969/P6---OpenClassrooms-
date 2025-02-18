import { buildElement } from '../../utils/dom-utils.js';

export class DropdownMenu {
    constructor(options) {
        this.options = options;
        this.currentOption = options.defaultOption || options.items[0];
        this.label = options.label || '';
        this.labelId = options.labelId || 'dropdown-label';
        this.menuId = options.menuId || 'dropdown-options';
        this.onChange = options.onChange || (() => {});
        this.element = null;
    }

    render() {
        const dropdownStructure = {
            tag: 'div',
            className: 'dropdown',
            attrs: {
                role: 'combobox',
                'aria-expanded': 'false',
                'aria-haspopup': 'listbox',
                'aria-controls': this.menuId,
                'aria-label': 'Trier les médias par',
                'aria-labelledby': this.labelId
            },
            children: [
                {
                    tag: 'button',
                    className: 'dropdown-toggle',
                    attrs: {
                        id: this.options.toggleId,
                        type: 'button',
                        'aria-expanded': 'false',
                        'aria-controls': this.menuId
                    },
                    children: [
                        {
                            tag: 'span',
                            text: this.currentOption.label,
                            attrs: {
                                'aria-label': `Option sélectionnée : ${this.currentOption.label}`
                            }
                        },
                        {
                            tag: 'i',
                            className: 'chevron-icon fa-solid fa-chevron-down',
                            attrs: { 'aria-hidden': 'true' }
                        }
                    ]
                },
                {
                    tag: 'ul',
                    className: 'dropdown-menu',
                    attrs: {
                        id: this.menuId,
                        role: 'listbox',
                        'aria-label': 'Options de tri disponibles'
                    },
                    children: this.options.items
                        .filter(option => option.id !== this.currentOption.id)
                        .map(option => ({
                            tag: 'button',
                            className: '',
                            attrs: {
                                role: 'option',
                                'aria-selected': 'false',
                                'data-value': option.id,
                                type: 'button'
                            },
                            text: option.label
                        }))
                }
            ]
        };

        const dropdown = buildElement(dropdownStructure);
        this.element = dropdown;
        this.setupEventListeners(dropdown);
        return dropdown;
    }

    setupEventListeners(dropdown) {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const toggleSpan = toggle.querySelector('span');

        toggleSpan.onclick = (e) => {
            e.stopPropagation();
            this.onChange(this.currentOption);
            // Ferme le menu si ouvert
            if (toggle.getAttribute('aria-expanded') === 'true') {
                this.toggleMenu(false, toggle, menu, dropdown);
            }
        };

        toggle.onclick = () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            this.toggleMenu(!isExpanded, toggle, menu, dropdown);
        };

        menu.querySelectorAll('button').forEach(button => {
            button.onclick = () => {
                const value = button.dataset.value;
                const selectedOption = this.options.items.find(opt => opt.id === value);

                this.currentOption = selectedOption;
                toggle.querySelector('span').textContent = selectedOption.label;

                // Mise à jour du menu
                const newOptions = this.options.items
                    .filter(opt => opt.id !== selectedOption.id)
                    .map(opt => {
                        const buttonEl = document.createElement('button');
                        buttonEl.setAttribute('role', 'option');
                        buttonEl.setAttribute('aria-selected', 'false');
                        buttonEl.setAttribute('data-value', opt.id);
                        buttonEl.textContent = opt.label;
                        return buttonEl;
                    });

                menu.innerHTML = '';
                newOptions.forEach(opt => menu.appendChild(opt));

                this.setupEventListeners(dropdown);

                // Fermer le menu et déclencher le callback
                this.toggleMenu(false, toggle, menu, dropdown);
                toggle.focus();

                // Déclencher le callback avec l'option sélectionnée
                this.onChange(selectedOption);
            };
        });

        document.addEventListener('click', e => {
            if (!dropdown.contains(e.target)) {
                this.toggleMenu(false, toggle, menu, dropdown);
            }
        });
    }

    toggleMenu(isOpen, toggle, menu, dropdown) {
        toggle.setAttribute('aria-expanded', isOpen);
        dropdown.setAttribute('data-expanded', isOpen);
        menu.setAttribute('aria-expanded', isOpen);
        
        // Rotation du chevron
        const chevron = toggle.querySelector('.chevron-icon');
        chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    }
} 