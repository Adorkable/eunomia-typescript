"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.humanReadableSinceDateTimeFormatter = exports.humanReadableDateTimeFormatter = void 0;
const moment_1 = require("moment");
const humanReadableDateTimeFormatter = (dateTime) => {
    return (0, moment_1.default)(dateTime).format('ha, MMMM Do, YYYY');
};
exports.humanReadableDateTimeFormatter = humanReadableDateTimeFormatter;
const humanReadableSinceDateTimeFormatter = (dateTime) => {
    return (0, moment_1.default)(dateTime).fromNow();
};
exports.humanReadableSinceDateTimeFormatter = humanReadableSinceDateTimeFormatter;
