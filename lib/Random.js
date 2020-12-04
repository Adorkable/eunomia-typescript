"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRandomOffsetClamped = exports.ClampMethod = exports.applyRandomOffset = exports.applyRandomDrift = exports.appliedRandomDrift = exports.randomValueInArray = exports.randomIndexValueInArray = exports.randomBool = exports.randomString = exports.random = exports.randomNoFunctionAvailableError = exports.initializeRandom = exports.createRandomFunction = void 0;
const seedrandom_1 = require("seedrandom");
const lodash_clonedeep_1 = require("lodash.clonedeep");
const Number_1 = require("./Number");
/**
 * module instance-wide last used Random function
 */
let lastRandomFunction = null;
/**
 * Create a seeded `random` function
 * @param seed Random seed
 * @returns seeded `random` function
 */
const createRandomFunction = (seed) => {
    return seedrandom_1.default(seed);
};
exports.createRandomFunction = createRandomFunction;
/**
 * Initialize module instance-wide `random` function
 * @param seed Random seed
 * @returns Module instance-wide `random` function
 */
const initializeRandom = (seed) => {
    lastRandomFunction = exports.createRandomFunction(seed);
    return lastRandomFunction;
};
exports.initializeRandom = initializeRandom;
/**
 * Error returned when calling `random` before it has been initialized
 */
exports.randomNoFunctionAvailableError = 'No random function available, either provide a function or initialize random globally';
/**
 * Generate a random number
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Randomly generated number
 */
const random = (randomFunction) => {
    const selectRandomFunction = () => {
        if (randomFunction) {
            return randomFunction;
        }
        if (lastRandomFunction) {
            return lastRandomFunction;
        }
        throw new Error(exports.randomNoFunctionAvailableError);
    };
    const use = selectRandomFunction();
    return use();
};
exports.random = random;
/**
 * Generate a random string
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Randomly generated string
 */
const randomString = (randomFunction) => {
    return `${exports.random(randomFunction)}`;
};
exports.randomString = randomString;
/**
 * Generate a random boolean value
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Randomly generated boolean value
 */
const randomBool = (randomFunction) => {
    return exports.random(randomFunction) < 0.5;
};
exports.randomBool = randomBool;
/**
 * Return a random index valid for the provided array
 * @param withinArray Array to return index from
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Valid random index
 */
const randomIndexValueInArray = (withinArray, randomFunction) => {
    const portion = withinArray.length * exports.random(randomFunction);
    const rounded = Math.round(portion);
    return rounded % withinArray.length;
};
exports.randomIndexValueInArray = randomIndexValueInArray;
/**
 * Return a random value for the provided array
 * @param withinArray Array to return value from
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Random value from the provided array
 */
const randomValueInArray = (withinArray, randomFunction) => {
    return withinArray[exports.randomIndexValueInArray(withinArray, randomFunction)];
};
exports.randomValueInArray = randomValueInArray;
const appliedRandomDrift = (valueAndDrift, randomFunction) => {
    const result = lodash_clonedeep_1.default(valueAndDrift);
    result.value = exports.applyRandomDrift(valueAndDrift.value, valueAndDrift.allowedDrift, randomFunction);
    return result;
};
exports.appliedRandomDrift = appliedRandomDrift;
const applyRandomDrift = (originalValue, allowedDrift, randomFunction) => {
    return (originalValue - allowedDrift / 2.0 + allowedDrift * exports.random(randomFunction));
};
exports.applyRandomDrift = applyRandomDrift;
const applyRandomOffset = (originalValue, offset, randomFunction) => {
    return originalValue - offset + offset * 2.0 * exports.random(randomFunction);
};
exports.applyRandomOffset = applyRandomOffset;
var ClampMethod;
(function (ClampMethod) {
    ClampMethod["Clamp"] = "clamp";
    ClampMethod["Mirror"] = "mirror";
    ClampMethod["Wrap"] = "wrap";
})(ClampMethod = exports.ClampMethod || (exports.ClampMethod = {}));
const applyRandomOffsetClamped = (originalValue, offset, minimum, maximum, method, randomFunction) => {
    const unclampedResult = exports.applyRandomOffset(originalValue, offset, randomFunction);
    switch (method !== undefined ? method : ClampMethod.Clamp) {
        case ClampMethod.Clamp:
            return Number_1.clamp(unclampedResult, minimum, maximum);
        case ClampMethod.Mirror:
            return Number_1.mirror(unclampedResult, minimum, maximum);
        case ClampMethod.Wrap:
            return Number_1.wrap(unclampedResult, minimum, maximum);
        default:
            return unclampedResult;
    }
};
exports.applyRandomOffsetClamped = applyRandomOffsetClamped;
