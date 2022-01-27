"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeURLParametersFromObject = exports.encodeURLParameters = exports.separateURLQuery = exports.parseURLQueryToObject = exports.parseURLQuery = void 0;
const parseURLQuery = (queryString) => {
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    return pairs.map((queryStringPair) => {
        const pair = queryStringPair.split('=');
        return {
            key: decodeURIComponent(pair[0]),
            value: decodeURIComponent(pair[1]) || ''
        };
    });
};
exports.parseURLQuery = parseURLQuery;
const parseURLQueryToObject = (queryString) => {
    const parameters = (0, exports.parseURLQuery)(queryString);
    const result = {};
    parameters.forEach((parameter) => {
        result[parameter.key] = parameter.value;
    });
    return result;
};
exports.parseURLQueryToObject = parseURLQueryToObject;
const separateURLQuery = (uri) => {
    const index = uri.indexOf('?');
    return index === -1 ? '' : uri.substr(index);
};
exports.separateURLQuery = separateURLQuery;
const encodeURLParameters = (params) => {
    return params
        .map((param) => {
        return (encodeURIComponent(param.key) + '=' + encodeURIComponent(param.value));
    })
        .join('&');
};
exports.encodeURLParameters = encodeURLParameters;
const encodeURLParametersFromObject = (paramsObject) => {
    return Object.typedKeys(paramsObject)
        .map((key) => {
        const value = paramsObject[key];
        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
    })
        .join('&');
};
exports.encodeURLParametersFromObject = encodeURLParametersFromObject;
