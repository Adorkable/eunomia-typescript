export declare const orderMinMax: (minimum: number, maximum: number) => [number, number];
export declare const orderedMinMaxWrapper: (perform: (number: number, minimum: number, maximum: number) => number) => (number: number, minimum: number, maximum: number) => number;
/**
 * clamp will automatically flip minimum and maximum if minimum is greater than maximum
 * @param number number to clamp
 * @param minimum minimum value
 * @param maximum maximum value
 */
export declare const clamp: (number: number, minimum: number, maximum: number) => number;
export declare const mirror: (number: number, minimum: number, maximum: number) => number;
export declare const wrap: (number: number, minimum: number, maximum: number) => number;
export declare const mean: (values: number[]) => number;
export declare const median: (values: number[]) => number;
/**
 * Linear interpolate a percent between two values
 * @param value amount to interpolate between 0 and 1
 * @param from start of range to interpolate
 * @param to end of range to interpolate
 */
export declare const lerp: (value: number, from: number, to: number) => number;
/**
 * Map a value from one range to another
 * @param value value to map from original range
 * @param fromStart start of original range
 * @param fromEnd end of original range
 * @param toStart start of range to map to
 * @param toEnd end of range to map to
 */
export declare const map: (value: number, fromStart: number, fromEnd: number, toStart: number, toEnd: number) => number;
