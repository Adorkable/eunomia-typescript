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
