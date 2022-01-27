"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Browser = void 0;
__exportStar(require("./Array"), exports);
__exportStar(require("./Color"), exports);
__exportStar(require("./Date"), exports);
__exportStar(require("./Map"), exports);
__exportStar(require("./Miscellanious"), exports);
__exportStar(require("./Number"), exports);
__exportStar(require("./Random"), exports);
__exportStar(require("./RequestProtocol"), exports);
__exportStar(require("./URLQuery"), exports);
__exportStar(require("./Parse"), exports);
exports.Browser = require("./Browser");
// export * as Node from './Node' // causing break by including by default, figure out the proper way to handle this
