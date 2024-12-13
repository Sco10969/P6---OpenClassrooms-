import { buildElement } from '../../utils/dom-utils.js';

export class DropdownMenu {
    constructor(options) {
        this.options = options;
        this.currentOption = options.defaultOption || options.items[0];
        this.label = options.label || '';
        this.labelId = options.labelId || 'dropdown-label';
        this.menuId = options.menuId || 'dropdown-options';
        this.onChange = options.onChange || (() => {});
        this.isAscending = false;
        this.isDescending = false;
        this.element = null;
        this.sortDirection = 'none';
    }

    render() {
        const dropdownStructure = {
            tag: 'div',
            className: 'dropdown',
            attrs: {
                'data-expanded': 'false',
                'data-sort-direction': this.sortDirection
            },
            children: [
                {
                    tag: 'button',
                    className: 'dropdown-toggle',
                    attrs: {
                        'aria-expanded': 'false',
                        'aria-labelledby': this.labelId,
                        'aria-controls': this.menuId
                    },
                    children: [
                        {
                            tag: 'span',
                            text: this.currentOption.label
                        },
                        {
                            tag: 'div',
                            className: 'sort-icons',
                            children: [
                                {
                                    tag: 'i',
                                    className: 'sort-icon sort-asc fa-solid fa-chevron-up',
                                    attrs: { 'aria-hidden': 'true' }
                                },
                                {
                                    tag: 'i',
                                    className: 'sort-icon sort-desc fa-solid fa-chevron-down',
                                    attrs: { 'aria-hidden': 'true' }
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'div',
                    className: 'dropdown-menu',
                    attrs: {
                        id: this.menuId,
                        role: 'listbox',
                        'aria-label': this.options.menuLabel || 'Options disponibles'
                    },
                    children: this.options.items
                        .filter(option => option.id !== this.currentOption.id)
                        .map(option => ({
                            tag: 'button',
                            className: '',
                            attrs: {
                                role: 'option',
                                'aria-selected': 'false',
                                'data-value': option.id
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
        const sortIcons = dropdown.querySelectorAll('.sort-icon');

        toggle.onclick = () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            this.toggleMenu(!isExpanded, toggle, menu, dropdown);
        };

        // Gestion des flèches de tri
        sortIcons.forEach(icon => {
            icon.onclick = (e) => {
                e.stopPropagation();

                const isDescIcon = icon.classList.contains('sort-desc');

                if (isDescIcon) {
                    if (this.isDescending) {
                        this.isDescending = false;
                        this.isAscending = false;
                    } else {
                        this.isDescending = true;
                        this.isAscending = false;
                    }
                } else {
                    if (this.isAscending) {
                        this.isAscending = false;
                        this.isDescending = false;
                    } else {
                        this.isAscending = true;
                        this.isDescending = false;
                    }
                }

                let direction = 'none';
                if (this.isAscending) direction = 'asc';
                if (this.isDescending) direction = 'desc';

                this.element.setAttribute('data-sort-direction', direction);

                console.log(
                    `Tri %c${this.currentOption.label}%c | Direction: %c${
                        this.isAscending ? '↑ ascendant' : 
                        this.isDescending ? '↓ descendant' : 
                        '⭐ aucun tri'
                    }`,
                    'color: #2196f3; font-weight: bold',
                    'color: inherit',
                    `color: ${
                        this.isAscending ? '#4CAF50' : 
                        this.isDescending ? '#f44336' : 
                        '#9e9e9e'
                    }; font-weight: bold`
                );

                this.onChange({
                    option: this.currentOption,
                    direction: direction
                });
            };
        });

        menu.querySelectorAll('button').forEach(button => {
            button.onclick = () => {
                const value = button.dataset.value;
                const selectedOption = this.options.items.find(opt => opt.id === value);
                
                this.currentOption = selectedOption;
                toggle.querySelector('span').textContent = selectedOption.label;

                this.sortDirection = 'none';
                this.element.setAttribute('data-sort-direction', this.sortDirection);

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

                this.toggleMenu(false, toggle, menu, dropdown);
                toggle.focus();
                this.onChange({
                    option: selectedOption,
                    direction: this.sortDirection
                });
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
        menu.setAttribute('aria-expanded', isOpen);
        dropdown.setAttribute('data-expanded', isOpen);
    }
} 