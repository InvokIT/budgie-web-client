import Message from "./Message";

it("should convert to JSON", () => {
    const message = new Message().addPart("test", {color:'red'});
    const messageJson = JSON.stringify(message);

    expect(messageJson).toEqual(`[{"text":"test","style":{"color":"red"}}]`);
});

it("should parse from a JSON string", () => {
    const message = new Message().addPart("test");
    const messageJson = JSON.stringify(message);

    expect(Message.fromJSON(messageJson)).toEqual(message);
});

it("should add parts fluidly", () => {
    const msg = new Message();
    expect(msg.addPart("test")).toBe(msg);
});

it("should add new parts to a parts property", () => {
    const msg = new Message().addPart("test");

    expect(msg.parts).toBeDefined();
    expect(msg.parts.length).toBe(1);
});

it("should create new parts with a text property", () => {
    const msg = new Message().addPart("test");
    expect(msg.parts[0].text).toBe("test");
});

it("should create new parts with a style property", () => {
    const msg = new Message().addPart("test", {color:"black"});
    expect(msg.parts[0].style).toEqual({color:"black"});
});
