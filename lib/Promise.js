"use strict";
// based on article by Joel Thoms
// https://hackernoon.com/functional-javascript-resolving-promises-sequentially-7aac18c4431e
// export const promiseSerialAccumulator = <ResultType, Container>(promiseFactories: Array<() => Promise<ResultType>>, containerFactory?: () => Container, accumulator?: (accumulated: Container, result: ResultType) => Container): Promise<Container> => {
//
//     if (!containerFactory) {
//         containerFactory = () => {
//             return [];
//         }
//     }
//
//     if (!accumulator) {
//         accumulator = Array.prototype.concat;
//     }
//
//     return promiseFactories.reduce(
//         (promise, promiseFactory) => {
//             return promise.then((container: Container) => {
//                 return promiseFactory().then((result: ResultType) => {
//                     return accumulator(container, result);
//                 });
//             });
//         },
//         Promise.resolve(containerFactory())
//     );
// }
Object.defineProperty(exports, "__esModule", { value: true });
// type AccumulatorPromiseFactory = <ResultType>() => Promise<ResultType>;
exports.promiseSerialAccumulator = (funcs) => (funcs.reduce((promise, nextFunc) => (promise.then((result) => (nextFunc().then(Array.prototype.concat.bind(result))))), Promise.resolve([])));
