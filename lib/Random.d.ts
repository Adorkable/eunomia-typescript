export declare type RandomFunction = () => number;
export declare const initializeRandomFunction: (seed: any) => RandomFunction;
export declare const initializeRandom: (seed: any) => RandomFunction;
export declare const random: (randomFunction?: RandomFunction | undefined) => number;
export declare const randomString: (randomFunction?: RandomFunction | undefined) => string;
export declare const randomBool: (randomFunction?: RandomFunction | undefined) => boolean;
export declare const randomIndexValueInArray: (withinArray: any[], randomFunction?: RandomFunction | undefined) => number;
export declare const randomValueInArray: <TypeOfValue>(withinArray: TypeOfValue[], randomFunction?: RandomFunction | undefined) => TypeOfValue;
export declare type ValueAndDrift = {
    value: number;
    allowedDrift: number;
};
export declare const appliedRandomDrift: (valueAndDrift: ValueAndDrift, randomFunction?: RandomFunction | undefined) => ValueAndDrift;
export declare const applyRandomDrift: (originalValue: number, allowedDrift: number, randomFunction?: RandomFunction | undefined) => number;
export declare const applyRandomOffset: (originalValue: number, offset: number, randomFunction?: RandomFunction | undefined) => number;
