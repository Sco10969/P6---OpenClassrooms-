/**
 * Gestionnaire de likes avec persistance locale
 */
export class LocalStorageManager {
    constructor() {
        this.prefix = 'media-';
    }

    /**
     * Récupère l'état complet d'un média
     */
    getMediaState(mediaId, initialLikes = 0) {
        try {
            const stored = localStorage.getItem(`${this.prefix}${mediaId}`);
            if (!stored) return { likes: initialLikes, isLiked: false };
            return JSON.parse(stored);
        } catch {
            return { likes: initialLikes, isLiked: false };
        }
    }

    /**
     * Sauvegarde l'état d'un média
     */
    saveMediaState(mediaId, state) {
        try {
            if (!state.isLiked) {
                localStorage.removeItem(`${this.prefix}${mediaId}`);
                return;
            }
            localStorage.setItem(
                `${this.prefix}${mediaId}`, 
                JSON.stringify(state)
            );
        } catch (e) {
            console.warn('Erreur localStorage:', e);
        }
    }

    /**
     * Gestion des likes
     */
    getLikes(mediaId, initialLikes = 0) {
        return this.getMediaState(mediaId, initialLikes).likes;
    }

    getLikeState(mediaId) {
        return this.getMediaState(mediaId).isLiked;
    }

    /**
     * Met à jour l'état des likes
     */
    updateLikeState(mediaId, isLiked, initialLikes = 0) {
        const currentState = this.getMediaState(mediaId, initialLikes);
        const newLikes = isLiked ? 
            (currentState.likes || initialLikes) + 1 : 
            (currentState.likes || initialLikes) - 1;

        const newState = { 
            likes: Math.max(0, newLikes),
            isLiked 
        };

        this.saveMediaState(mediaId, newState);
        return newState;
    }

    /**
     * Calcule le total des likes
     */
    getTotalLikes(mediaList = []) {
        return mediaList.reduce((total, media) => {
            const state = this.getMediaState(media.id, media.likes);
            return total + state.likes;
        }, 0);
    }
}
