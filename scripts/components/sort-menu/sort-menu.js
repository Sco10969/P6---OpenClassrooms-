import { buildElement } from '../../utils/dom-utils.js';

export class SortMenu {
    constructor(onSortChange) {
        this.options = [
            { id: 'popularity', label: 'Popularité' },
            { id: 'date', label: 'Date' },
            { id: 'title', label: 'Titre' }
        ];
        this.currentOption = this.options[0];
        this.isAscending = true;
        this.onSortChange = onSortChange;
    }

    render() {
        const menuStructure = {
            tag: 'div',
            className: 'sort-menu',
            attrs: { 
                role: 'region',
                'aria-label': 'Options de tri'
            },
            children: [
                {
                    tag: 'span',
                    className: 'sort-label',
                    text: 'Trier par',
                    attrs: { id: 'sort-label' }
                },
                {
                    tag: 'div',
                    className: 'dropdown',
                    attrs: { role: 'listbox' },
                    children: [
                        {
                            tag: 'button',
                            className: 'dropdown-toggle',
                            attrs: {
                                'aria-haspopup': 'listbox',
                                'aria-expanded': 'false',
                                'aria-labelledby': 'sort-label',
                                'aria-controls': 'sort-options'
                            },
                            children: [
                                {
                                    tag: 'span',
                                    text: this.currentOption.label
                                },
                                {
                                    tag: 'i',
                                    className: 'fa-solid fa-chevron-down sort-direction',
                                    attrs: {
                                        'aria-hidden': 'true'
                                    }
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            className: 'dropdown-menu',
                            attrs: {
                                id: 'sort-options',
                                role: 'listbox',
                                'aria-label': 'Options de tri disponibles'
                            },
                            children: this.options.reduce((acc, option, index) => {
                                if (index > 0) acc.push({ 
                                    tag: 'hr',
                                    attrs: { role: 'separator' }
                                });
                                acc.push({
                                    tag: 'button',
                                    className: this.currentOption.id === option.id ? 'active' : '',
                                    attrs: {
                                        role: 'option',
                                        'aria-selected': this.currentOption.id === option.id,
                                        'data-sort': option.id
                                    },
                                    text: option.label
                                });
                                return acc;
                            }, [])
                        }
                    ]
                }
            ]
        };

        const menu = buildElement(menuStructure);
        const toggle = menu.querySelector('.dropdown-toggle');
        const dropdownMenu = menu.querySelector('.dropdown-menu');

        // Toggle du menu
        toggle.onclick = () => {
            const isExpanded = dropdownMenu.classList.contains('show');
            dropdownMenu.classList.toggle('show');
            toggle.classList.toggle('open');
            toggle.setAttribute('aria-expanded', !isExpanded);
        };

        // Sélection d'une option
        dropdownMenu.querySelectorAll('button').forEach(button => {
            button.onclick = () => {
                const sortId = button.dataset.sort;

                if (sortId === this.currentOption.id) {
                    this.isAscending = !this.isAscending;
                } else {
                    this.currentOption = this.options.find(opt => opt.id === sortId);
                    this.isAscending = true;
                }

                // Mise à jour UI et ARIA
                toggle.querySelector('span').textContent = this.currentOption.label;
                dropdownMenu.querySelectorAll('button').forEach(btn => {
                    const isSelected = btn.dataset.sort === sortId;
                    btn.classList.toggle('active', isSelected);
                    btn.setAttribute('aria-selected', isSelected);
                });

                toggle.classList.remove('open');
                dropdownMenu.classList.remove('show');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
                
                this.onSortChange(sortId, this.isAscending);
            };
        });

        // Ferme le menu si clic en dehors
        document.addEventListener('click', e => {
            if (!menu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        return menu;
    }
}
