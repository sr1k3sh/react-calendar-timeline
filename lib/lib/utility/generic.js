"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = exports.keyBy = exports.deepObjectCompare = exports.arraysEqual = exports._length = exports._get = void 0;
var lodash_isequal_1 = __importDefault(require("lodash.isequal"));
// so we could use both immutable.js objects and regular objects
function _get(object, key) {
    return typeof object.get === 'function' ? object.get(key) : object[key];
}
exports._get = _get;
function _length(object) {
    return typeof object.count === 'function' ? object.count() : object.length;
}
exports._length = _length;
function arraysEqual(array1, array2) {
    return (_length(array1) === _length(array2) &&
        array1.every(function (element, index) {
            return element === _get(array2, index);
        }));
}
exports.arraysEqual = arraysEqual;
function deepObjectCompare(obj1, obj2) {
    return (0, lodash_isequal_1.default)(obj1, obj2);
}
exports.deepObjectCompare = deepObjectCompare;
function keyBy(value, key) {
    var obj = {};
    value.forEach(function (element) {
        obj[element[key]] = element;
    });
    return obj;
}
exports.keyBy = keyBy;
function noop() { }
exports.noop = noop;
