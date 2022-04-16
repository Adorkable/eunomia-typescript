/**
 * Random function signature
 */
export declare type RandomFunction = () => number;
/**
 * Create a seeded `random` function
 * @param seed Random seed
 * @returns seeded `random` function
 */
export declare const createRandomFunction: (seed: any) => RandomFunction;
/**
 * Initialize module instance-wide `random` function
 * @param seed Random seed
 * @returns Module instance-wide `random` function
 */
export declare const initializeRandom: (seed: any) => RandomFunction;
/**
 * Error message returned when calling `random` before it has been initialized
 */
export declare const randomNoFunctionAvailableError = "No random function available, either provide a function or initialize random globally";
/**
 * Error returned when calling `random` before it has been initialized
 */
export declare class RandomNoFunctionAvailableError extends Error {
    constructor();
}
/**
 * Generate a random number
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Randomly generated number
 * @throws RandomNoFunctionAvailableError if no random function is available
 */
export declare const random: (randomFunction?: RandomFunction | undefined) => number;
export declare const randomNumberBetweenValues: (minimum: number, maximum: number, randomFunction?: RandomFunction | undefined) => number;
/**
 * Generate a random string
 * @param minimumLength minimum length of returned string, defaults to `0`
 * @param maximumLength maximum length of returned string, defaults to `2^15` (what seems to be a safe value for browsers)
 * @param characterSet optional set of characters to select from randomly
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Randomly generated string
 */
export declare const randomString: (minimumLength?: number | undefined, maximumLength?: number | undefined, characterSet?: string | undefined, randomFunction?: RandomFunction | undefined) => string;
/**
 * Generate a random boolean value
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Randomly generated boolean value
 * @throws RandomNoFunctionAvailableError if no random function is available
 */
export declare const randomBool: (randomFunction?: RandomFunction | undefined) => boolean;
/**
 * Return a random index valid for the provided array
 * @param withinArray Array to return index from
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Valid random index
 * @throws RandomNoFunctionAvailableError if no random function is available
 */
export declare const randomIndexValueInArray: (withinArray: Array<any>, randomFunction?: RandomFunction | undefined) => number;
/**
 * Return a random value for the provided array
 * @param withinArray Array to return value from
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Random value from the provided array
 */
export declare const randomValueInArray: <TypeOfValue>(withinArray: TypeOfValue[], randomFunction?: RandomFunction | undefined) => TypeOfValue;
export declare type ValueAndDrift = {
    value: number;
    allowedDrift: number;
};
export declare const appliedRandomDrift: (valueAndDrift: ValueAndDrift, randomFunction?: RandomFunction | undefined) => ValueAndDrift;
export declare const applyRandomDrift: (originalValue: number, allowedDrift: number, randomFunction?: RandomFunction | undefined) => number;
export declare const applyRandomOffset: (originalValue: number, offset: number, randomFunction?: RandomFunction | undefined) => number;
export declare enum ClampMethod {
    Clamp = "clamp",
    Mirror = "mirror",
    Wrap = "wrap"
}
export declare const applyRandomOffsetClamped: (originalValue: number, offset: number, minimum: number, maximum: number, method?: ClampMethod | undefined, randomFunction?: RandomFunction | undefined) => number;
