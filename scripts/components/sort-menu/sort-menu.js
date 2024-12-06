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
            children: [
                {
                    tag: 'span',
                    className: 'sort-label',
                    text: 'Trier par'
                },
                {
                    tag: 'div',
                    className: 'dropdown',
                    children: [
                        {
                            tag: 'button',
                            className: 'dropdown-toggle',
                            children: [
                                {
                                    tag: 'span',
                                    text: this.currentOption.label
                                },
                                {
                                    tag: 'i',
                                    className: 'fa-solid fa-chevron-down sort-direction'
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            className: 'dropdown-menu',
                            children: this.options.reduce((acc, option, index) => {
                                if (index > 0) acc.push({ tag: 'hr' });
                                acc.push({
                                    tag: 'button',
                                    className: this.currentOption.id === option.id ? 'active' : '',
                                    attrs: { 'data-sort': option.id },
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
            dropdownMenu.classList.toggle('show');
            toggle.classList.toggle('open');
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

                toggle.querySelector('span').textContent = this.currentOption.label;
                dropdownMenu.querySelectorAll('button').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.sort === sortId);
                });

                toggle.classList.remove('open');
                dropdownMenu.classList.remove('show');
                this.onSortChange(sortId, this.isAscending);
            };
        });

        // Ferme le menu si clic en dehors
        document.addEventListener('click', e => {
            if (!menu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
                toggle.classList.remove('open');
            }
        });

        return menu;
    }
}
