import { displayModal } from '../utils/contactForm.js';

export function photographerTemplate(photographerState) {
    const { name, portrait, city, country, tagline, price, id } = photographerState.photographerData;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const card = document.createElement('figure');
        card.classList.add('card-index');

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

        return card;
    }

    function getPhotographerHeaderDOM() {
        const card = document.createElement('figure');
        card.classList.add('card-index');
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

        return card;
    }

    function createHeartIcon() {
        const heartIcon = document.createElement('img');
        heartIcon.setAttribute('src', 'assets/icons/favorite-24px 1.svg');
        heartIcon.setAttribute('alt', 'like icon');
        heartIcon.style.width = '21px';
        heartIcon.style.height = '24px';
        return heartIcon;
    }

    function getMediaSectionDOM() {
        const mediaData = photographerState.mediaData;

        const mediaCards = mediaData.map(media => {
            const mediaCard = document.createElement('figure');
            mediaCard.classList.add('card-index', 'media-card');

            let mediaElement;
            if (media.image) {
                mediaElement = document.createElement('img');
                mediaElement.setAttribute('src', `assets/medias/${name}/${media.image}`);
                mediaElement.setAttribute('alt', media.title);
            } else if (media.video) {
                mediaElement = document.createElement('video');
                mediaElement.setAttribute('muted', true);
                mediaElement.setAttribute('loop', true);
                mediaElement.setAttribute('autoplay', true);
                mediaElement.setAttribute('playsinline', true);
                mediaElement.style.pointerEvents = 'none';

                const source = document.createElement('source');
                source.setAttribute('src', `assets/medias/${name}/${media.video}`);
                source.setAttribute('type', 'video/mp4');
                mediaElement.appendChild(source);
            }

            // Figcaption de medias infos
            const figcaption = document.createElement('figcaption');
            figcaption.classList.add('media-info');

            // Title de medias infos
            const title = document.createElement('p');
            title.textContent = media.title;

            // Likes container de medias infos
            const likesContainer = document.createElement('div');
            likesContainer.classList.add('likes-container');

            // Vérifie si le média a déjà été liké
            const isLiked = localStorage.getItem(`liked-${media.id}`) === 'true';
            
            // Récupère le nombre de likes stocké ou utilise la valeur initiale
            const storedLikes = localStorage.getItem(`likes-${media.id}`);
            media.likes = storedLikes ? parseInt(storedLikes) : media.likes;

            // Conteur de likes de medias infos
            const likesCount = document.createElement('span');
            likesCount.classList.add('likes-count');
            likesCount.textContent = media.likes;

            // Bouton de like de medias infos
            const likeButton = document.createElement('button');
            likeButton.classList.add('like-button');
            const heartIcon = createHeartIcon();
            
            // Applique la classe 'liked' si déjà liké
            if (isLiked) {
                heartIcon.classList.add('liked');
                likeButton.classList.add('liked');
            }
            
            likeButton.appendChild(heartIcon);

            likeButton.addEventListener('click', () => {
                const isCurrentlyLiked = likeButton.classList.contains('liked');
                
                if (isCurrentlyLiked) {
                    // Unlike
                    media.likes -= 1;
                    likeButton.classList.remove('liked');
                    heartIcon.classList.remove('liked');
                    localStorage.setItem(`liked-${media.id}`, 'false');
                } else {
                    // Like
                    media.likes += 1;
                    likeButton.classList.add('liked');
                    heartIcon.classList.add('liked');
                    localStorage.setItem(`liked-${media.id}`, 'true');
                }
                
                likesCount.textContent = media.likes;
                localStorage.setItem(`likes-${media.id}`, media.likes);
            });

            likesContainer.appendChild(likesCount);
            likesContainer.appendChild(likeButton);

            figcaption.appendChild(title);
            figcaption.appendChild(likesContainer);

            mediaCard.appendChild(mediaElement);
            mediaCard.appendChild(figcaption);

            return mediaCard;
        });

        return mediaCards;
    }

    return { getUserCardDOM, getPhotographerHeaderDOM, getMediaSectionDOM };
}
