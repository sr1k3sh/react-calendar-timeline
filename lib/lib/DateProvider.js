"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DateContext = _interopRequireDefault(require("./DateContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DateProvider = function DateProvider(props) {
  var locale = props.locale,
      children = props.children;
  return /*#__PURE__*/_react["default"].createElement(_DateContext["default"].Provider, {
    value: {
      locale: locale
    }
  }, children);
};

DateProvider.propTypes = {
  children: _propTypes["default"].node,
  locale: _propTypes["default"].object.isRequired
};
var _default = DateProvider;
exports["default"] = _default;