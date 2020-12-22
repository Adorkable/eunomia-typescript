"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.median = exports.mean = exports.wrap = exports.mirror = exports.clamp = exports.orderedMinMaxWrapper = exports.orderMinMax = void 0;
const orderMinMax = (minimum, maximum) => {
    return [Math.min(minimum, maximum), Math.max(maximum, minimum)];
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
const mean = (values) => {
    return values.reduce((previous, current) => {
        return previous + current;
    }) / values.length;
};
exports.mean = mean;
// Based on: https://stackoverflow.com/a/45309555
const median = (values) => {
    if (values.length === 0) {
        return 0;
    }
    values.sort((a, b) => {
        return a - b;
    });
    const half = Math.floor(values.length / 2);
    if (values.length % 2) {
        return values[half];
    }
    return (values[half - 1] + values[half]) / 2.0;
};
exports.median = median;
