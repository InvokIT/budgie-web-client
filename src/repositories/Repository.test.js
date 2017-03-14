import Repository from "./Repository";
import MemoryRepositoryStrategy from "./MemoryRepositoryStrategy";

const createRepo = () => new Repository(new MemoryRepositoryStrategy());

it("can save string type items", () => {
    const repo = createRepo();
    const key = "test-key";
    const value = "test-value";

    repo.set(key, value);

    expect(repo.get(key)).toBe(value);
});

it("can save objects", () => {
    const repo = createRepo();
    const key = "test-key";
    const value = {v:"test"};

    repo.set(key, value);

    expect(repo.get(key)).toEqual(value);
});

it("can save numbers", () => {
    const repo = createRepo();
    const key = "test-key";
    const value = 101;

    repo.set(key, value);

    expect(repo.get(key)).toBe(value);
});

describe("set", () => {
    let repo;

    beforeEach(() => {
        repo = createRepo();
    });

    it("should throw when key is undefined", () => {
        expect(() => repo.set(undefined)).toThrow();
    });

    it("should throw when key is null", () => {
        expect(() => repo.set(null)).toThrow();
    });

    it("should throw when key is not a string but still truthy", () => {
        expect(() => repo.set(1)).toThrow();
    });

    it("should throw when key is not a string but still falsy", () => {
        expect(() => repo.set(0)).toThrow();
    });

    it("can set null or undefined key values", () => {
        repo.set("null-value", null);
        repo.set("null-value", undefined);
    });
});
