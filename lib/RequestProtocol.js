"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSocketString = exports.httpString = exports.webSocketSecure = exports.webSocketInsecure = exports.httpSecure = exports.httpInsecure = void 0;
exports.httpInsecure = "http";
exports.httpSecure = "https";
exports.webSocketInsecure = "ws";
exports.webSocketSecure = "wss";
const requestProtocolString = (req) => {
    if (req) {
        if (req.headers["x-forwarded-proto"]) {
            return req.headers["x-forwarded-proto"];
        }
        if (req.secure) {
            return exports.httpSecure;
        }
        return exports.httpInsecure;
    }
    return window.location.protocol.slice(0, -1);
};
const httpString = (req) => {
    return requestProtocolString(req);
};
exports.httpString = httpString;
const webSocketString = (req) => {
    return requestProtocolString(req) === exports.httpInsecure
        ? exports.webSocketInsecure
        : exports.webSocketSecure;
};
exports.webSocketString = webSocketString;
