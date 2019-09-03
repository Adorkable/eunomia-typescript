"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seedrandom_1 = require("seedrandom");
const lodash_clonedeep_1 = require("lodash.clonedeep");
let lastRandomFunction = null;
exports.initializeRandomFunction = (seed) => {
    return seedrandom_1.default(seed);
};
exports.initializeRandom = (seed) => {
    lastRandomFunction = exports.initializeRandomFunction(seed);
    return lastRandomFunction;
};
exports.random = (randomFunction) => {
    const selectRandomFunction = () => {
        if (randomFunction) {
            return randomFunction;
        }
        if (lastRandomFunction) {
            return lastRandomFunction;
        }
        throw new Error('No random function available, either provide a function or initialize random globally');
    };
    const use = selectRandomFunction();
    return use();
};
exports.randomString = (randomFunction) => {
    return `${exports.random(randomFunction)}`;
};
exports.randomBool = (randomFunction) => {
    return exports.random(randomFunction) < 0.5;
};
exports.randomIndexValueInArray = (withinArray, randomFunction) => {
    const portion = withinArray.length * exports.random(randomFunction);
    const rounded = Math.round(portion);
    return rounded % withinArray.length;
};
exports.randomValueInArray = (withinArray, randomFunction) => {
    return withinArray[exports.randomIndexValueInArray(withinArray, randomFunction)];
};
exports.appliedRandomDrift = (valueAndDrift, randomFunction) => {
    const result = lodash_clonedeep_1.default(valueAndDrift);
    result.value = exports.applyRandomDrift(valueAndDrift.value, valueAndDrift.allowedDrift, randomFunction);
    return result;
};
exports.applyRandomDrift = (originalValue, allowedDrift, randomFunction) => {
    return originalValue - (allowedDrift / 2.0) + allowedDrift * exports.random(randomFunction);
};
exports.applyRandomOffset = (originalValue, offset, randomFunction) => {
    return originalValue - offset + (offset * 2.0) * exports.random(randomFunction);
};
