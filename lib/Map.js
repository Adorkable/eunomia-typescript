"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapIndexMapToArray = exports.mapsEqual = exports.mergeMaps = exports.mapReduce = exports.mapMapToArray = exports.mapFilter = exports.mapMap = exports.mapForEach = exports.flattenMap = void 0;
const lodash_union_1 = require("lodash.union");
const flattenMap = (items) => {
    const ids = Object.keys(items);
    return ids.map((id) => {
        return items[id];
    });
};
exports.flattenMap = flattenMap;
const mapForEach = (items, forEach) => {
    const keys = Object.keys(items);
    keys.forEach((key) => {
        const originalValue = items[key];
        forEach(originalValue, key);
    });
};
exports.mapForEach = mapForEach;
const mapMap = (items, mapTo) => {
    const result = {};
    exports.mapForEach(items, (value, key) => {
        result[key] = mapTo(value, key);
    });
    return result;
};
exports.mapMap = mapMap;
const mapFilter = (items, include) => {
    const result = {};
    exports.mapForEach(items, (value, key) => {
        if (include(value, key) === true) {
            result[key] = value;
        }
    });
    return result;
};
exports.mapFilter = mapFilter;
const mapMapToArray = (items, mapTo) => {
    const result = [];
    exports.mapForEach(items, (value, key) => {
        if (mapTo) {
            result.push(mapTo(value, key));
        }
        else {
            result.push(value);
        }
    });
    return result;
};
exports.mapMapToArray = mapMapToArray;
const mapReduce = (items, reducer, initialValue) => {
    let accumulatedValue = initialValue;
    exports.mapForEach(items, (value, key) => {
        accumulatedValue = reducer(accumulatedValue, value, key);
    });
    return accumulatedValue;
};
exports.mapReduce = mapReduce;
const mergeMaps = (itemsArray) => {
    return itemsArray.reduce((merged, currents) => {
        exports.mapForEach(currents, (value, id) => {
            merged[id] = value;
        });
        return merged;
    }, {});
};
exports.mergeMaps = mergeMaps;
const mapsEqual = (leftItems, rightItems, isEqual) => {
    let result = true;
    const ids = lodash_union_1.default(Object.keys(leftItems), Object.keys(rightItems));
    for (let index = 0; index < ids.length; index += 1) {
        const id = ids[index];
        const leftItem = leftItems[id];
        const rightItem = rightItems[id];
        if (leftItem && rightItem) {
            result = isEqual(leftItem, rightItem);
            if (!result) {
                break;
            }
        }
        else if (!leftItem && !rightItem) {
            continue;
        }
        else {
            result = false;
            break;
        }
    }
    return result;
};
exports.mapsEqual = mapsEqual;
const mapIndexMapToArray = (indexMap, mapTo) => {
    const indexKeys = Object.keys(indexMap).sort();
    return indexKeys.map((indexKey) => {
        const value = indexMap[indexKey];
        if (mapTo) {
            return mapTo(value, indexKey);
        }
        return value;
    });
};
exports.mapIndexMapToArray = mapIndexMapToArray;
