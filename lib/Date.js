"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = require("moment");
exports.humanReadableDateTimeFormatter = (dateTime) => {
    return moment_1.default(dateTime).format('ha, MMMM Do, YYYY');
};
exports.humanReadableSinceDateTimeFormatter = (dateTime) => {
    return moment_1.default(dateTime).fromNow();
};
