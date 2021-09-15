"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashStringToArrayValue = exports.hashStringToArrayIndex = exports.mapArrayToIndexMap = exports.compareArrayContents = void 0;
const compareArrayContents = (left, right) => __awaiter(void 0, void 0, void 0, function* () {
    if (left.length !== right.length) {
        return false;
    }
    if (!left.reduce((accrued, next) => {
        if (!accrued) {
            return false;
        }
        return right.indexOf(next) !== -1;
    }, true)) {
        return false;
    }
    return right.reduce((accrued, next) => {
        if (!accrued) {
            return false;
        }
        return left.indexOf(next) !== -1;
    }, true);
});
exports.compareArrayContents = compareArrayContents;
const mapArrayToIndexMap = (items, mapTo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = {};
    items.forEach((item, index) => {
        const indexKey = index.toString(10);
        if (mapTo) {
            result[indexKey] = mapTo(item, indexKey);
        }
        else {
            result[indexKey] = item;
        }
    });
    return result;
});
exports.mapArrayToIndexMap = mapArrayToIndexMap;
const hashStringToArrayIndex = (string, array) => {
    const hash = string.split('').reduce((previous, character) => {
        return character.charCodeAt(0) + previous;
    }, 0);
    return hash % array.length;
};
exports.hashStringToArrayIndex = hashStringToArrayIndex;
const hashStringToArrayValue = (string, array) => {
    const index = (0, exports.hashStringToArrayIndex)(string, array);
    return array[index];
};
exports.hashStringToArrayValue = hashStringToArrayValue;
