export interface URLQueryParameter {
    key: string;
    value: string;
}
export declare const parseURLQuery: (queryString: string) => Array<URLQueryParameter>;
export declare const parseURLQueryToObject: (queryString: string) => Object;
export declare const separateURLQuery: (uri: string) => string;
export declare const encodeURLParameters: (params: URLQueryParameter[]) => string;
export declare const encodeURLParametersFromObject: (paramsObject: object) => string;
