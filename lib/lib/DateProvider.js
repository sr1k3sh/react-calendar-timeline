"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var prop_types_1 = __importDefault(require("prop-types"));
var DateContext_1 = __importDefault(require("./DateContext"));
var DateProvider = function (props) {
    var locale = props.locale, children = props.children;
    return ((0, jsx_runtime_1.jsx)(DateContext_1.default.Provider, __assign({ value: { locale: locale } }, { children: children }), void 0));
};
DateProvider.propTypes = {
    children: prop_types_1.default.node,
    locale: prop_types_1.default.object.isRequired,
};
exports.default = DateProvider;
