import { upperFirst, reduce, forEach, isFunction } from "lodash";

const levels = {
    "debug": process.env.NODE_ENV !== "production",
    "trace": process.env.NODE_ENV !== "production",
    "info": true,
    "warn": true,
    "error": true
};

const combineOutputs = (outputs) => {
    return Object.create(null, reduce(levels, (p, enabled, level) => {
        p[level] = {
            value: function(...args) {
                forEach(outputs, o => {
                    const fn = o[level];
                    if (isFunction(fn)) {
                        fn.apply(o, args);
                    }
                });
            }
        };

        return p;
    }, {}));
};

const Logger = function (loggerName, outputs) {
    if (!outputs || outputs.length === 0) {
        outputs = [window.console];
    }

    this._name = loggerName;
    this._output = combineOutputs(outputs);
};

Object.defineProperties(Logger.prototype, reduce(levels, (p, enabled, level) => {
    const isEnabledPropName = `is${upperFirst(level)}Enabled`;

    p[level] = {
        value: function (msg) {
            if (this[isEnabledPropName]) {
                this.log(level, msg);
            }
        }
    };

    p[isEnabledPropName] = {
        value: enabled,
        writable: true
    };

    return p;
}, {
    "log": {
        value: function (level, msg) {
            const fn = this._output[level];
            fn(`${this._name}: ${msg}`);
        }
    }
}));

export default (loggerName, ...outputs) => new Logger(loggerName, outputs);
