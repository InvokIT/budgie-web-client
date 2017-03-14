import getLogger from "../log";
const log = getLogger("repositories/LocalStorageRepositoryStrategy");

const error = () => {
    const msg = "LocalStorage is not supported by client.";
    log.error(msg);
    throw new Error(msg);
};

const getStorage = ((localStorage) => {
    return localStorage ? (() => localStorage) : error;
})(window.localStorage);

class LocalStorageRepositoryStrategy {
    constructor(prefix) {
        this.prefix = prefix;
    }

    _applyPrefix(key) {
        return this.prefix ? this.prefix + key : key;
    }

    get(key) {
        key = this._applyPrefix(key);
        return getStorage().getItem(key);
    }

    set(key, value) {
        key = this._applyPrefix(key);
        try {
            getStorage().setItem(key, value);
        } catch (e) {
            log.error(`Error when saving (${key}, ${value}): ${e}`);
            throw new Error("Unable to save to local storage", e);
        }
    }

    remove(key) {
        key = this._applyPrefix(key);
        getStorage().removeItem(key);
    }
}

export default LocalStorageRepositoryStrategy;