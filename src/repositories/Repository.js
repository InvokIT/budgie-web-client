import isString from "lodash/isString";
import isNil from "lodash/isNil";

const JSON_VALUE_PREFIX = "data:application/json;";

class Repository {
    constructor(storageStrategy) {
        if (isNil(storageStrategy)) {
            throw new Error("storageStrategy not given.");
        }

        this.storage = storageStrategy;
    }

    _validateKey(key) {
        if (!(isString(key) && key.length > 0)) {
            throw new Error(`Invalid key: "${key}"`);
        }
    }

    _encodeValue(value) {
        if (isString(value)) {
            return value;
        } else {
            value = JSON.stringify(value);
            return JSON_VALUE_PREFIX + value;
        }
    }

    _decodeValue(value) {
        if (isNil(value)) {
            return value;
        }

        if (!isString(value)) {
            throw new Error("Unexpected value: " + value);
        }

        if (value.startsWith(JSON_VALUE_PREFIX)) {
            value = JSON.parse(value.substring(JSON_VALUE_PREFIX.length));
        }

        return value;
    }

    get(key) {
        this._validateKey(key);

        return this._decodeValue(this.storage.get(key));
    }

    set(key, value) {
        this._validateKey(key);

        if (isNil(value)) {
            this.remove(key);
            return;
        }

        this.storage.set(key, this._encodeValue(value));
    }

    remove(key) {
        this._validateKey(key);

        this.storage.remove(key);
    }
}

export default Repository;