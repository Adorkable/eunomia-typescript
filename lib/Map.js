"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_union_1 = require("lodash.union");
exports.flattenMap = (items) => {
    const ids = Object.keys(items);
    return ids.map((id) => {
        return items[id];
    });
};
exports.mapForEach = (items, forEach) => {
    const keys = Object.keys(items);
    keys.forEach((key) => {
        const originalValue = items[key];
        forEach(originalValue, key);
    });
};
exports.mapMap = (items, mapTo) => {
    const result = {};
    exports.mapForEach(items, (value, key) => {
        result[key] = mapTo(value, key);
    });
    return result;
};
exports.mapFilter = (items, include) => {
    const result = {};
    exports.mapForEach(items, (value, key) => {
        if (include(value, key) === true) {
            result[key] = value;
        }
    });
    return result;
};
exports.mapMapToArray = (items, mapTo) => {
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
exports.mapReduce = (items, reducer, initialValue) => {
    let accumulatedValue = initialValue;
    exports.mapForEach(items, (value, key) => {
        accumulatedValue = reducer(accumulatedValue, value, key);
    });
    return accumulatedValue;
};
exports.mergeMaps = (itemsArray) => {
    return itemsArray.reduce((merged, currents) => {
        exports.mapForEach(currents, (value, id) => {
            merged[id] = value;
        });
        return merged;
    }, {});
};
exports.mapsEqual = (leftItems, rightItems, isEqual) => {
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
exports.mapIndexMapToArray = (indexMap, mapTo) => {
    const indexKeys = Object.keys(indexMap).sort();
    return indexKeys.map((indexKey) => {
        const value = indexMap[indexKey];
        if (mapTo) {
            return mapTo(value, indexKey);
        }
        return value;
    });
};
