"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _locale = require("date-fns/locale");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = /*#__PURE__*/_react["default"].createContext({
  locale: _locale.enGB
});
exports["default"] = _default;