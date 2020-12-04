"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = exports.mirror = exports.clamp = exports.orderedMinMaxWrapper = exports.orderMinMax = void 0;
const orderMinMax = (minimum, maximum) => {
    return [
        Math.min(minimum, maximum),
        Math.max(maximum, minimum)
    ];
};
exports.orderMinMax = orderMinMax;
const orderedMinMaxWrapper = (perform) => {
    return (number, minimum, maximum) => {
        const [useMinimum, useMaximum] = exports.orderMinMax(minimum, maximum);
        return perform(number, useMinimum, useMaximum);
    };
};
exports.orderedMinMaxWrapper = orderedMinMaxWrapper;
/**
 * clamp will automatically flip minimum and maximum if minimum is greater than maximum
 * @param number number to clamp
 * @param minimum minimum value
 * @param maximum maximum value
 */
exports.clamp = exports.orderedMinMaxWrapper((number, minimum, maximum) => {
    let result = number;
    if (result < minimum) {
        result = minimum;
    }
    if (result > maximum) {
        result = maximum;
    }
    return result;
});
exports.mirror = exports.orderedMinMaxWrapper((number, minimum, maximum) => {
    let result = number;
    while (result < minimum || result > maximum) {
        if (result < minimum) {
            const difference = minimum - result;
            result = minimum + difference;
        }
        if (result > maximum) {
            const difference = result - maximum;
            result = maximum - difference;
        }
    }
    return result;
});
exports.wrap = exports.orderedMinMaxWrapper((number, minimum, maximum) => {
    let result = number;
    while (result < minimum || result > maximum) {
        if (result < minimum) {
            const difference = minimum - result;
            result = maximum - difference;
        }
        if (result > maximum) {
            const difference = result - maximum;
            result = minimum + difference;
        }
    }
    return result;
});