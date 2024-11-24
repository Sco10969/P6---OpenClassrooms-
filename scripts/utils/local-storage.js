/**
 * Classe utilitaire pour gérer le stockage local des likes
 */

/**
 * TODO : A rework
 */

export class LocalStorageManager {
    constructor() {
        this.storageStructure = {
            prefix: 'media-',
            defaultState: {
                count: 0,
                isLiked: false
            }
        };
    }

    getMediaState(mediaId) {
        const structure = {
            key: `${this.storageStructure.prefix}${mediaId}`,
            state: this.storageStructure.defaultState
        };

        const storedData = localStorage.getItem(structure.key);
        return storedData ? JSON.parse(storedData) : structure.state;
    }

    saveMediaState(mediaId, state) {
        const structure = {
            key: `${this.storageStructure.prefix}${mediaId}`,
            data: JSON.stringify(state)
        };

        localStorage.setItem(structure.key, structure.data);
    }

    getLikes(mediaId) {
        return this.getMediaState(mediaId).count || null;
    }

    getLikeState(mediaId) {
        return this.getMediaState(mediaId).isLiked;
    }

    saveLikes(mediaId, likes) {
        const state = this.getMediaState(mediaId);
        state.count = likes;
        this.saveMediaState(mediaId, state);
    }

    saveLikeState(mediaId, isLiked) {
        const state = this.getMediaState(mediaId);
        state.isLiked = isLiked;
        this.saveMediaState(mediaId, state);
    }

    getTotalLikes(mediaList) {
        return mediaList.reduce((total, media) => {
            const state = this.getMediaState(media.id);
            return total + (state.count || media.likes);
        }, 0);
    }
}
