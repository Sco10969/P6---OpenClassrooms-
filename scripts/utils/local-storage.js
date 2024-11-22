/**
 * Classe utilitaire pour gérer le stockage local des likes
 */

/**
 * TODO : A rework
 */

export class LocalStorageManager {
    /**
     * Récupère le nombre de likes stocké pour un média
     * @param {number} mediaId - L'ID du média
     * @returns {number|null} Le nombre de likes ou null si non trouvé
     */
    static getLikes(mediaId) {
        const likes = localStorage.getItem(`likes-${mediaId}`);
        return likes ? parseInt(likes) : null;
    }

    /**
     * Récupère l'état "liké" d'un média
     * @param {number} mediaId - L'ID du média
     * @returns {boolean} true si le média est liké, false sinon
     */
    static getLikeState(mediaId) {
        return localStorage.getItem(`liked-${mediaId}`) === 'true';
    }

    /**
     * Sauvegarde le nombre de likes d'un média
     * @param {number} mediaId - L'ID du média
     * @param {number} likes - Le nombre de likes à sauvegarder
     */
    static saveLikes(mediaId, likes) {
        localStorage.setItem(`likes-${mediaId}`, likes.toString());
    }

    /**
     * Sauvegarde l'état "liké" d'un média
     * @param {number} mediaId - L'ID du média
     * @param {boolean} isLiked - L'état à sauvegarder
     */
    static saveLikeState(mediaId, isLiked) {
        localStorage.setItem(`liked-${mediaId}`, isLiked.toString());
    }

    static getTotalLikes(mediaList) {
        return mediaList.reduce((total, media) => {
            const storedLikes = this.getLikes(media.id) || media.likes;
            return total + storedLikes;
        }, 0);
    }
}
