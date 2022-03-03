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
export declare function findValidUnionValue<T extends V, V>(value: V, values: readonly T[]): T;
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
export declare function isValidUnionValue<T extends V, V>(value: V, values: readonly T[]): boolean;
/** Invalid Union Value Error */
export declare class InvalidUnionValueError<T> extends Error {
    private _value;
    private _values;
    constructor(_value: unknown, _values: readonly T[]);
    get value(): unknown;
    get values(): readonly T[];
}
