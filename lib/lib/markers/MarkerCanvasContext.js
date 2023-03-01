"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkerCanvasConsumer = exports.MarkerCanvasProvider = void 0;
var react_1 = __importDefault(require("react"));
/* eslint-disable no-console */
var defaultContextState = {
    subscribeToMouseOver: function () {
        console.warn('"subscribeToMouseOver" default func is being used');
    }
};
/* eslint-enable */
var _a = react_1.default.createContext(defaultContextState), Consumer = _a.Consumer, Provider = _a.Provider;
exports.MarkerCanvasProvider = Provider;
exports.MarkerCanvasConsumer = Consumer;
