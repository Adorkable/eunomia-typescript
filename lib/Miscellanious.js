"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasValue = exports.setKeyValue = exports.getKeyValue = void 0;
// TODO: should be '/' instead of '.'? or both?
const getKeyValue = (from, key) => {
    const nesting = key.split('.');
    if (nesting.length > 0) {
        let within = from;
        for (let index = 0; index < nesting.length; index += 1) {
            if (index === nesting.length - 1) {
                return within[nesting[index]];
            }
            else if (typeof within[nesting[index]] === 'object') {
                within = within[nesting[index]];
            }
            else {
                return undefined;
            }
        }
    }
    return from[key];
};
exports.getKeyValue = getKeyValue;
const setKeyValue = (to, key, value) => {
    const nesting = key.split('.');
    if (nesting.length > 0) {
        let within = to;
        for (let index = 0; index < nesting.length; index += 1) {
            if (index === nesting.length - 1) {
                within[nesting[index]] = value;
                break;
            }
            else {
                if (typeof within[nesting[index]] !== 'object') {
                    within[nesting[index]] = {};
                }
                within = within[nesting[index]];
            }
        }
    }
    else {
        to[key] = value;
    }
};
exports.setKeyValue = setKeyValue;
const hasValue = (test) => {
    return typeof test !== 'undefined' && test !== null;
};
exports.hasValue = hasValue;
