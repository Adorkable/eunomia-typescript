export declare const flattenMap: <ResultType>(items: any) => ResultType[];
export declare const mapForEach: (items: any, forEach: (value: any, key: string) => void) => void;
export declare const mapMap: (items: Object, mapTo: (value: any, key: string) => any) => Object;
export declare const mapFilter: (items: Object, include: (value: any, key: string) => boolean) => Object;
export declare const mapMapToArray: <ResultType>(items: Object, mapTo?: ((value: any, key: string) => ResultType) | undefined) => ResultType[];
export declare const mapReduce: <ResultType>(items: Object, reducer: (accumulatedValue: ResultType, currentItem: any, currentKey: string) => ResultType, initialValue: ResultType) => ResultType;
export declare const mergeMaps: (itemsArray: Array<Object>) => Object;
export declare const mapsEqual: <ResultType>(leftItems: any, rightItems: any, isEqual: (leftItem: ResultType, rightItem: ResultType) => boolean) => boolean;
export declare const mapIndexMapToArray: <ResultType>(indexMap: any, mapTo?: ((value: any, indexKey: string) => ResultType) | undefined) => ResultType[];
