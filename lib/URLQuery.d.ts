export interface URLQueryParameter {
    key: string;
    value: string;
}
export declare const parseURLQuery: (queryString: string) => URLQueryParameter[];
export declare const parseURLQueryToObject: (queryString: string) => Object;
