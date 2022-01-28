export declare const compareArrayContents: (left: Array<any>, right: Array<any>) => Promise<boolean>;
export declare const mapArrayToIndexMap: <ArrayValueType>(items: ArrayValueType[], mapTo?: ((value: ArrayValueType, indexKey: string) => ArrayValueType) | undefined) => Promise<Record<string, ArrayValueType>>;
export declare const hashStringToArrayIndex: (string: string, array: Array<any>) => number;
export declare const hashStringToArrayValue: <ValueType>(string: string, array: ValueType[]) => ValueType;
export declare const notEmpty: <TValue>(value: TValue | null | undefined) => value is TValue;
