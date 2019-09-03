"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chroma = require("chroma-js");
exports.BlackAndWhite = [
    0x000000,
    0xffffff
];
exports.colorTypeToHexString = (color) => {
    let hexString = color.toString(16);
    while (hexString.length < 6) {
        hexString = `0${hexString}`;
    }
    return `#${hexString}`;
};
exports.colorTypeWithAlphaToHexString = (color, alpha) => {
    const hexStringWithHash = exports.colorTypeToHexString(color);
    const alphaValue = 256 * alpha;
    let alphaString = alphaValue.toString(16);
    while (alphaString.length < 2) {
        alphaString = `0${alphaString}`;
    }
    return hexStringWithHash + alphaString;
};
exports.colorHexStringToColorType = (color) => {
    return parseInt(color.replace(/^#/, ''), 16);
};
exports.colorGradientToCSS = (colorGradient) => {
    const linear = (colorGradient) => {
        return `${colorGradient.direction.toString(10)}deg`;
    };
    const radialCircle = (colorGradient) => {
        let result = 'circle';
        if (typeof colorGradient.circleSize === 'number') {
            result += ` ${colorGradient.circleSize.toString(10)}px`;
        }
        else if (typeof colorGradient.circleSize === 'string') {
            result += ` ${colorGradient.circleSize}`;
        }
        return result;
    };
    const radialEllipse = (colorGradient) => {
        let result = 'ellipse ';
        const { ellipseSize } = colorGradient;
        if (typeof ellipseSize === 'string') {
            result += ` ${ellipseSize}`;
        }
        else {
            result += ` ${ellipseSize.horizonalRadius.toString(10)}px` + ` ${ellipseSize.verticalRadius.toString(10)}px`;
        }
        return result;
    };
    const position = (position) => {
        if (typeof position === 'number') {
            return `${(position * 100).toString(10)}%`;
        }
        return position;
    };
    const radial = (colorGradient) => {
        let result = '';
        const { shape } = colorGradient;
        if ('circle' in shape) {
            result += radialCircle(shape);
        }
        else {
            result += radialEllipse(shape);
        }
        result += ` at ${position(colorGradient.horizontalPosition)} ${position(colorGradient.verticalPosition)}`;
        return result;
    };
    let result = '';
    const { type } = colorGradient;
    if ('linear' in type) {
        result += `linear-gradient(${linear(type)}, `;
    }
    else {
        result += `radial-gradient(${radial(type)}, `;
    }
    const colorStops = colorGradient.colorStops.map((colorStop) => {
        return `${exports.colorTypeToHexString(colorStop.color)} ${(colorStop.location * 100).toString(10)}%`;
    });
    result += colorStops.join(', ');
    result += ')';
    return result;
};
exports.colorSetToEvenColorGradient = (colorSet) => {
    if (colorSet.length < 0) {
        throw new Error('Color Set is not compatible with Color Gradient');
    }
    const type = {
        linear: true,
        direction: 90
    };
    const result = {
        type,
        colorStops: colorSet.map((color, index) => {
            let location;
            if (index === 0) {
                location = 0.0;
            }
            else if (index === colorSet.length - 1) {
                location = 1.0;
            }
            else {
                location = index / (colorSet.length - 1);
            }
            return {
                color,
                location
            };
        })
    };
    return result;
};
exports.randomColor = (randomFunction) => {
    const hexString = chroma.random(randomFunction).hex();
    return exports.colorHexStringToColorType(hexString);
};
