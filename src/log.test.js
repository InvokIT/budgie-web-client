import { reduce } from "lodash";
import getLogger from "./log";

const levels = ["debug", "trace", "info", "warn", "error"];

let output;
let logger;
const loggerName = "log.test";

beforeEach(() => {
    output = reduce(levels, (o, l) => {
        o[l] = jest.fn();
        return o;
    }, {});

    logger = getLogger(loggerName, output);
});

levels.forEach(l => {
    it(`should log ${l} messages`, () => {
        const msg = `${l} test`;
        logger[l](msg);
        expect(output[l]).toBeCalledWith(`${loggerName}: ${msg}`);
    });
});
