import { displayModal } from '../utils/contactForm.js';

export function photographerTemplate(data, isDetailPage = false) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const card = document.createElement('figure');
        card.classList.add('card-index');

        if (isDetailPage) {
            card.classList.add('detail-page');

            const headerContent = document.createElement('div');
            headerContent.classList.add('header-content');

            const nameElement = document.createElement('h2');
            nameElement.classList.add('name');
            nameElement.textContent = name;

            const locationElement = document.createElement('p');
            locationElement.classList.add('location');
            locationElement.textContent = `${city}, ${country}`;

            const taglineElement = document.createElement('p');
            taglineElement.classList.add('tagline');
            taglineElement.textContent = tagline;

            headerContent.appendChild(nameElement);
            headerContent.appendChild(locationElement);
            headerContent.appendChild(taglineElement);

            const contactButton = document.createElement('button');
            contactButton.classList.add('contact_button');
            contactButton.textContent = 'Contactez-moi';
            contactButton.setAttribute('aria-label', 'Ouvrir le formulaire de contact');
            contactButton.addEventListener('click', displayModal);

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');

            const img = document.createElement('img');
            img.classList.add('portrait');
            img.setAttribute("src", picture);

            imgContainer.appendChild(img);

            card.appendChild(headerContent);
            card.appendChild(contactButton);
            card.appendChild(imgContainer);
        } else {
            const link = document.createElement('a');
            link.classList.add('link');
            link.setAttribute("href", `./photographer.html?id=${id}`);
            link.setAttribute('aria-label', `Voir le profil de ${name}`);

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');

            const img = document.createElement('img');
            img.classList.add('portrait');
            img.setAttribute("src", picture);
            img.setAttribute("alt", `Portrait de ${name}`);

            const h2 = document.createElement('h2');
            h2.classList.add('name');
            h2.textContent = name;

            const description = document.createElement('div');
            description.classList.add('description');

            const location = document.createElement('span');
            location.classList.add('location');
            location.textContent = `${city}, ${country}`;

            const taglineElement = document.createElement('p');
            taglineElement.classList.add('tagline');
            taglineElement.textContent = tagline;

            const priceElement = document.createElement('data');
            priceElement.classList.add('price');
            priceElement.textContent = `${price}€/jour`;

            imgContainer.appendChild(img);
            link.appendChild(imgContainer);
            link.appendChild(h2);
            description.appendChild(location);
            description.appendChild(taglineElement);
            description.appendChild(priceElement);
            card.appendChild(link);
            card.appendChild(description);
        }

        return card;
    }

    return { getUserCardDOM };
}
