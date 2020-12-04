export interface URLQueryParameter {
    key: string;
    value: string;
}
export declare const parseURLQuery: (queryString: string) => Array<URLQueryParameter>;
export declare const parseURLQueryToObject: (queryString: string) => Object;
