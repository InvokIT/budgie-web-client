import upperFirst from "lodash/upperFirst";

const levels = ["debug", "info", "warn", "error"];

const loggerProto = Object.defineProperty({}, "log", {
    value: function(level, msg) {
        const fn = window.console && window.console[level];
        fn(msg);
    }
});

for (const l of levels) {
    Object.defineProperties(loggerProto, {
        [l]: {
            value: (() => {
                const enabledProp = "is" + upperFirst(l) + "Enabled";
                return function(msg) {
                    if (this[enabledProp]) {
                        this.log(l, msg);
                    }
                };
            })()
        },
        ["is" + upperFirst(l) + "Enabled"]: {
            value: true,
            writable: true
        }
    });
}

const logger = Object.create(loggerProto);
logger.isDebugEnabled = process.env.NODE_ENV !== "production";

export default logger;
