"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRandomOffsetClamped = exports.ClampMethod = exports.applyRandomOffset = exports.applyRandomDrift = exports.appliedRandomDrift = exports.randomValueInArray = exports.randomIndexValueInArray = exports.randomBool = exports.randomString = exports.randomNumberBetweenValues = exports.random = exports.RandomNoFunctionAvailableError = exports.randomNoFunctionAvailableError = exports.initializeRandom = exports.createRandomFunction = void 0;
const seedrandom = require("seedrandom");
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
    return seedrandom(seed);
};
exports.createRandomFunction = createRandomFunction;
/**
 * Initialize module instance-wide `random` function
 * @param seed Random seed
 * @returns Module instance-wide `random` function
 */
const initializeRandom = (seed) => {
    lastRandomFunction = (0, exports.createRandomFunction)(seed);
    return lastRandomFunction;
};
exports.initializeRandom = initializeRandom;
/**
 * Error message returned when calling `random` before it has been initialized
 */
exports.randomNoFunctionAvailableError = 'No random function available, either provide a function or initialize random globally';
/**
 * Error returned when calling `random` before it has been initialized
 */
class RandomNoFunctionAvailableError extends Error {
    constructor() {
        super(exports.randomNoFunctionAvailableError);
    }
}
exports.RandomNoFunctionAvailableError = RandomNoFunctionAvailableError;
/**
 * Selects from an overidden or library-wide initialized random function or fails
 * @param randomFunction an optional override random function
 * @returns selected random function
 * @throws RandomNoFunctionAvailableError if no random function is available
 */
const selectRandomFunction = (randomFunction) => {
    if (randomFunction) {
        return randomFunction;
    }
    if (lastRandomFunction) {
        return lastRandomFunction;
    }
    throw new RandomNoFunctionAvailableError();
};
/**
 * Generate a random number
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Randomly generated number
 * @throws RandomNoFunctionAvailableError if no random function is available
 */
const random = (randomFunction) => {
    const use = selectRandomFunction(randomFunction);
    return use();
};
exports.random = random;
const randomNumberBetweenValues = (minimum, maximum, randomFunction) => {
    return (0, exports.random)(randomFunction) * (maximum - minimum + 1) + minimum;
};
exports.randomNumberBetweenValues = randomNumberBetweenValues;
// TODO: make this actually all characters, too lazy now :P
const AllCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(),./;\'[]\\-=`<>?:"{}|_+~ ';
/**
 * Generate a random string
 * @param minimumLength minimum length of returned string, defaults to `0`
 * @param maximumLength maximum length of returned string, defaults to `2^15` (what seems to be a safe value for browsers)
 * @param characterSet optional set of characters to select from randomly
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Randomly generated string
 */
const randomString = (minimumLength, maximumLength, characterSet, randomFunction) => {
    const targetLength = Math.floor((0, exports.randomNumberBetweenValues)(Math.min(minimumLength || 0), Math.max(maximumLength || Math.pow(2, 15))));
    let result = '';
    const useCharacters = characterSet || AllCharacters;
    while (result.length < targetLength) {
        const characterIndex = Math.floor((0, exports.randomNumberBetweenValues)(0, useCharacters.length));
        result += useCharacters.charAt(characterIndex);
    }
    return result;
};
exports.randomString = randomString;
/**
 * Generate a random boolean value
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Randomly generated boolean value
 * @throws RandomNoFunctionAvailableError if no random function is available
 */
const randomBool = (randomFunction) => {
    return (0, exports.random)(randomFunction) < 0.5;
};
exports.randomBool = randomBool;
/**
 * Return a random index valid for the provided array
 * @param withinArray Array to return index from
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Valid random index
 * @throws RandomNoFunctionAvailableError if no random function is available
 */
const randomIndexValueInArray = (withinArray, randomFunction) => {
    const portion = withinArray.length * (0, exports.random)(randomFunction);
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
    return withinArray[(0, exports.randomIndexValueInArray)(withinArray, randomFunction)];
};
exports.randomValueInArray = randomValueInArray;
const appliedRandomDrift = (valueAndDrift, randomFunction) => {
    const result = (0, lodash_clonedeep_1.default)(valueAndDrift);
    result.value = (0, exports.applyRandomDrift)(valueAndDrift.value, valueAndDrift.allowedDrift, randomFunction);
    return result;
};
exports.appliedRandomDrift = appliedRandomDrift;
const applyRandomDrift = (originalValue, allowedDrift, randomFunction) => {
    return (originalValue - allowedDrift / 2.0 + allowedDrift * (0, exports.random)(randomFunction));
};
exports.applyRandomDrift = applyRandomDrift;
const applyRandomOffset = (originalValue, offset, randomFunction) => {
    return originalValue - offset + offset * 2.0 * (0, exports.random)(randomFunction);
};
exports.applyRandomOffset = applyRandomOffset;
var ClampMethod;
(function (ClampMethod) {
    ClampMethod["Clamp"] = "clamp";
    ClampMethod["Mirror"] = "mirror";
    ClampMethod["Wrap"] = "wrap";
})(ClampMethod = exports.ClampMethod || (exports.ClampMethod = {}));
const applyRandomOffsetClamped = (originalValue, offset, minimum, maximum, method, randomFunction) => {
    const unclampedResult = (0, exports.applyRandomOffset)(originalValue, offset, randomFunction);
    switch (method !== undefined ? method : ClampMethod.Clamp) {
        case ClampMethod.Clamp:
            return (0, Number_1.clamp)(unclampedResult, minimum, maximum);
        case ClampMethod.Mirror:
            return (0, Number_1.mirror)(unclampedResult, minimum, maximum);
        case ClampMethod.Wrap:
            return (0, Number_1.wrap)(unclampedResult, minimum, maximum);
        default:
            return unclampedResult;
    }
};
exports.applyRandomOffsetClamped = applyRandomOffsetClamped;
