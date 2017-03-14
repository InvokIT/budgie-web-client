class MemoryRepository {
    constructor() {
        this.items = new Map();
    }

    get(key) {
        return this.items.get(key);
    }

    set(key, value) {
        this.items.set(key, value);
    }

    remove(key) {
        this.items.delete(key);
    }
}

export default MemoryRepository;