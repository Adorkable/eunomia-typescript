export declare class InvalidNumberStringError extends Error {
    static Message: string;
    invalidNumberString: string;
    constructor(invalidNumberString: string);
}
export declare class InvalidNumberSuffixCharacterError extends Error {
    static Message: string;
    invalidNumberSuffixCharacter: string;
    constructor(invalidNumberSuffixCharacter: string);
}
export declare const parseNumberWithLetterScale: (numberString: string) => number;
export declare const parseStringList: (stringList: string, separator?: string | RegExp) => string[];
export declare const parseNumberList: (numberList: string, separator?: string | RegExp, radix?: number) => number[];
