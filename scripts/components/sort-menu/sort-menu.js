import { buildElement } from '../../utils/dom-utils.js';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu.js';

export class SortMenu {
    constructor(onSortChange) {
        // Options de tri
        this.options = [
            { id: 'popularity', label: 'Popularité' },
            { id: 'date', label: 'Date' },
            { id: 'title', label: 'Titre' }
        ];
        // Option sélectionnée par défaut
        this.currentOption = this.options[0];
        // Fonction de tri
        this.onSortChange = onSortChange;

        // Définition des fonctions de tri pour chaque option
        this.sortFunctions = {
            popularity: (a, b) => b.likes - a.likes, // Tri décroissant par défaut
            date: (a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA - dateB; // Tri croissant par défaut
            },
            title: (a, b) => a.title.localeCompare(b.title) // Tri alphabétique par défaut
        };
    }

    sortData(data, option) {
        // Validation des données
        if (!data || !Array.isArray(data)) return [];

        // Récupération de la fonction de tri
        const sortFn = this.sortFunctions[option];
        if (!sortFn) return data;

        // Application du tri
        return [...data].sort((a, b) => sortFn(a, b));
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
                    tag: 'label',
                    className: 'sort-label',
                    text: 'Trier par',
                    attrs: { 
                        id: 'sort-label',
                        for: 'sort-toggle'
                    }
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
            toggleId: 'sort-toggle',
            menuLabel: 'Options de tri disponibles',
            showSeparators: true,
            onChange: (option) => {
                this.currentOption = option;
                this.onSortChange(option.id);
            }
        });

        menu.appendChild(dropdownMenu.render());
        return menu;
    }
}
