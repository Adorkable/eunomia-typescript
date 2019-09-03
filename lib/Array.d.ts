export declare const compareArrays: (left: any[], right: any[]) => boolean;
export declare const mapArrayToIndexMap: <ResultType>(items: ResultType[], mapTo?: ((value: any, indexKey: string) => ResultType) | undefined) => Object;
export declare const hashStringToArrayIndex: (string: string, array: any[]) => number;
export declare const hashStringToArrayValue: <ValueType>(string: string, array: ValueType[]) => ValueType;
