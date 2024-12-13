import { buildElement } from '../../utils/dom-utils.js';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu.js';

export class SortMenu {
    constructor(onSortChange) {
        this.options = [
            { id: 'popularity', label: 'Popularité' },
            { id: 'date', label: 'Date' },
            { id: 'title', label: 'Titre' }
        ];
        this.currentOption = this.options[0];
        this.onSortChange = onSortChange;

        // Définition des fonctions de tri pour chaque option
        this.sortFunctions = {
            popularity: (a, b, isAscending) =>
                // Tri par likes
                isAscending ? a.likes - b.likes : b.likes - a.likes,
           
            date: (a, b, isAscending) => {
                 // Tri par date
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return isAscending ? dateA - dateB : dateB - dateA;
            },

            title: (a, b, isAscending) =>
                // Tri alphabétique
                isAscending ? 
                    a.title.localeCompare(b.title) : 
                    b.title.localeCompare(a.title)
        };
    }

    sortData(data, option, direction) {
        // Validation des données
        if (!data || !Array.isArray(data)) return [];

        // Récupération de la fonction de tri
        const sortFn = this.sortFunctions[option];
        if (!sortFn) return data;

        // Application du tri
        const isAscending = direction === 'desc';
        return [...data].sort((a, b) => sortFn(a, b, isAscending));
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
                }
            ]
        };

        const menu = buildElement(menuStructure);

        // Création du dropdown menu
        const dropdownMenu = new DropdownMenu({
            items: this.options,
            defaultOption: this.currentOption,
            labelId: 'sort-label',
            menuId: 'sort-options',
            menuLabel: 'Options de tri disponibles',
            showSeparators: true,
            onChange: ({ option, direction }) => {
                this.currentOption = option;
                // Appel du callback avec l'option et la direction
                this.onSortChange(option.id, direction);
            }
        });

        // Ajout du dropdown au menu de tri
        menu.appendChild(dropdownMenu.render());

        return menu;
    }
}
