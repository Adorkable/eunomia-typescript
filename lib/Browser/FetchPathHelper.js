"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestProtocol_1 = require("../RequestProtocol");
exports.default = (path, req) => {
    if (!req && typeof window !== "undefined") {
        return path;
    }
    const host = req
        ? req.headers["x-forwarded-host"] || req.headers.host
        : window.location.host;
    const proto = (0, RequestProtocol_1.httpString)(req);
    return `${proto}://${host}${path}`;
};
