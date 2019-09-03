"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareArrays = (left, right) => {
    if ((!left && right) || (left && !right)) {
        return false;
    }
    if (!Array.isArray(left) || !Array.isArray(right)) {
        return left === right;
    }
    if (left.length !== right.length) {
        return false;
    }
    return left.reduce((accrued, next) => {
        if (!accrued) {
            return false;
        }
        return right.indexOf(next) !== -1;
    });
};
exports.mapArrayToIndexMap = (items, mapTo) => {
    const result = {};
    items.forEach((item, index) => {
        const indexKey = index.toString(10);
        if (mapTo) {
            result[indexKey] = mapTo(item, indexKey);
        }
        else {
            result[indexKey] = item;
        }
    });
    return result;
};
exports.hashStringToArrayIndex = (string, array) => {
    const hash = string.split('').reduce((previous, character) => {
        return character.charCodeAt(0) + previous;
    }, 0);
    return hash % array.length;
};
exports.hashStringToArrayValue = (string, array) => {
    const index = exports.hashStringToArrayIndex(string, array);
    return array[index];
};
