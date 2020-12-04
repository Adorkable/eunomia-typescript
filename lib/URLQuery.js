"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseURLQueryToObject = exports.parseURLQuery = void 0;
const parseURLQuery = (queryString) => {
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
exports.parseURLQuery = parseURLQuery;
const parseURLQueryToObject = (queryString) => {
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
exports.parseURLQueryToObject = parseURLQueryToObject;
