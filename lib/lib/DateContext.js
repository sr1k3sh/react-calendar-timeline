"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _enGB = _interopRequireDefault(require("date-fns/locale/en-GB"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = /*#__PURE__*/_react["default"].createContext({
  locale: _enGB["default"]
});

exports["default"] = _default;