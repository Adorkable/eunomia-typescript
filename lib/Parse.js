"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumberList = exports.parseStringList = exports.parseNumberWithLetterScale = exports.InvalidNumberSuffixCharacterError = exports.InvalidNumberStringError = void 0;
class InvalidNumberStringError extends Error {
    constructor(invalidNumberString) {
        super(InvalidNumberStringError.Message);
        this.invalidNumberString = invalidNumberString;
    }
}
exports.InvalidNumberStringError = InvalidNumberStringError;
InvalidNumberStringError.Message = 'Invalid number string';
class InvalidNumberSuffixCharacterError extends Error {
    constructor(invalidNumberSuffixCharacter) {
        super(InvalidNumberSuffixCharacterError.Message);
        this.invalidNumberSuffixCharacter = invalidNumberSuffixCharacter;
    }
}
exports.InvalidNumberSuffixCharacterError = InvalidNumberSuffixCharacterError;
InvalidNumberSuffixCharacterError.Message = 'Invalid number suffix character';
const parseNumberWithLetterScale = (numberString) => {
    const matches = numberString.match(/([0-9.]+)([a-zA-Z]?)/);
    if (!matches || matches.length < 1) {
        throw new InvalidNumberStringError(numberString);
    }
    let result = parseFloat(matches[1]);
    if (matches.length >= 2) {
        let power = 0;
        switch (matches[2].toUpperCase()) {
            case 'K':
                power = 3;
                break;
            case 'M':
                power = 6;
                break;
            case 'B':
                power = 9;
                break;
            case '':
                power = 0;
                break;
            default:
                throw new InvalidNumberSuffixCharacterError(matches[2]);
        }
        result *= Math.pow(10, power);
    }
    return result;
};
exports.parseNumberWithLetterScale = parseNumberWithLetterScale;
const parseStringList = (stringList, separator = /,[ ]*/) => {
    return stringList.split(separator);
};
exports.parseStringList = parseStringList;
const parseNumberList = (numberList, separator = /,[ ]*/, radix = 10) => {
    return numberList.split(separator).map((value) => {
        return parseInt(value, radix);
    });
};
exports.parseNumberList = parseNumberList;
