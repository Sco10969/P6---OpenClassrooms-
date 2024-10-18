export function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const card = document.createElement('figure');
        card.classList.add('card-index');

        const link = document.createElement('a');
        link.classList.add('link');
        link.setAttribute("href", `./photographer.html?id=${id}`);

        const description = document.createElement('div');
        description.classList.add('description');

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        const img = document.createElement('img');
        img.classList.add('portrait');
        img.setAttribute("src", picture);

        const h2 = document.createElement('h2');
        h2.classList.add('name');
        h2.textContent = name;

        const location = document.createElement('p');
        location.classList.add('location');
        location.textContent = `${city}, ${country}`;

        const taglineElement = document.createElement('p');
        taglineElement.classList.add('tagline');
        taglineElement.textContent = tagline;

        const priceElement = document.createElement('p');
        priceElement.classList.add('price');
        priceElement.textContent = `${price}€/jour`;

        link.appendChild(img);
        link.appendChild(h2);
        description.appendChild(location);
        description.appendChild(taglineElement);
        description.appendChild(priceElement);
        card.appendChild(link);
        card.appendChild(description);

        return card;
    }
    return { getUserCardDOM }
}