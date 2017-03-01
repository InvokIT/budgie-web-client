
class Message {
    static fromJSON(json) {
        const parts = JSON.parse(json);
        return new Message(parts);
    }

    constructor(parts = []) {
        this.parts = parts;
    }

    addPart(text, style) {
        this.parts.push({
            text, style
        });

        return this;
    }

    toJSON() {
        return this.parts;
    }
}

export default Message;