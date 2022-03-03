"use strict";
// Based on https://stackoverflow.com/a/61129291
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUnionValueError = exports.isValidUnionValue = exports.findValidUnionValue = void 0;
/**
 * Find if an unknown value is within a Typescript safe "union" values array
 * @param value Value to test
 * @param values "Union" values array
 * @returns found value if found
 * @throws `InvalidUnionValueError` if value not found
 * @example
 *   const sheepNames = ['Capn Frisky', 'Mr. Snugs', 'Lambchop'] as const
 *   type SheepName = typeof sheepNames[number]
 *   try {
 *     const validValue: SheepName = findValidUnionValue(JSON.parse('"Capn Frisky"'), sheepNames)
 *   } catch (e) {
 *   if (e instanceof InvalidUnionValueException) {
 *     console.error(e.message)
 *     return
 *   }
 *   throw e
 * }
 */
function findValidUnionValue(value, values) {
    const found = values.find((test) => test === value);
    if (found) {
        return found;
    }
    throw new InvalidUnionValueError(value, values);
}
exports.findValidUnionValue = findValidUnionValue;
/**
 * Test if an unknown value is within a Typescript safe "union" values array
 * @param value Value to test
 * @param values "Union" values array
 * @returns true if value is valid, otherwise false
 * @rethrows unexpected Errors
 * @example
 *   const sheepNames = ['Capn Frisky', 'Mr. Snugs', 'Lambchop'] as const
 *   type SheepName = typeof sheepNames[number]
 *   if (isValidUnionValue(JSON.parse('"Capn Frisky"'), sheepNames)) {
 *   }
 */
function isValidUnionValue(value, values) {
    try {
        findValidUnionValue(value, values);
        return true;
    }
    catch (error) {
        if (error instanceof InvalidUnionValueError) {
            return false;
        }
        throw error;
    }
}
exports.isValidUnionValue = isValidUnionValue;
/** Invalid Union Value Error */
class InvalidUnionValueError extends Error {
    constructor(_value, _values) {
        super(`Invalid union value ${_value}`);
        this._value = _value;
        this._values = _values;
    }
    get value() {
        return this.value;
    }
    get values() {
        return this._values;
    }
}
exports.InvalidUnionValueError = InvalidUnionValueError;
