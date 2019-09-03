"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseURLQuery = (queryString) => {
    const pairs = (queryString[0] === '?'
        ? queryString.substr(1)
        : queryString).split('&');
    return pairs.map((queryStringPair) => {
        const pair = queryStringPair.split('=');
        return {
            key: decodeURIComponent(pair[0]),
            value: decodeURIComponent(pair[1]) || ''
        };
    });
};
exports.parseURLQueryToObject = (queryString) => {
    const pairs = (queryString[0] === '?'
        ? queryString.substr(1)
        : queryString).split('&');
    const result = {};
    pairs.forEach((queryStringPair) => {
        const pair = queryStringPair.split('=');
        result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]) || '';
    });
    return result;
};
