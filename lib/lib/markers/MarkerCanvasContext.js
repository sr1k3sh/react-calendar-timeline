"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkerCanvasConsumer = exports.MarkerCanvasProvider = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
var defaultContextState = {
  subscribeToMouseOver: function subscribeToMouseOver() {
    console.warn('"subscribeToMouseOver" default func is being used');
  }
};
/* eslint-enable */

var _React$createContext = /*#__PURE__*/_react["default"].createContext(defaultContextState),
    Consumer = _React$createContext.Consumer,
    Provider = _React$createContext.Provider;

var MarkerCanvasProvider = Provider;
exports.MarkerCanvasProvider = MarkerCanvasProvider;
var MarkerCanvasConsumer = Consumer;
exports.MarkerCanvasConsumer = MarkerCanvasConsumer;