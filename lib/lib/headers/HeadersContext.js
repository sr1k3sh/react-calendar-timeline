"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.TimelineHeadersConsumer = exports.TimelineHeadersProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var generic_1 = require("../utility/generic");
var defaultContextState = {
    registerScroll: function () {
        // eslint-disable-next-line
        console.warn('default registerScroll header used');
        return generic_1.noop;
    },
    rightSidebarWidth: 0,
    leftSidebarWidth: 150,
    timeSteps: {}
};
var _a = react_1.default.createContext(defaultContextState), Consumer = _a.Consumer, Provider = _a.Provider;
var TimelineHeadersProvider = /** @class */ (function (_super) {
    __extends(TimelineHeadersProvider, _super);
    function TimelineHeadersProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimelineHeadersProvider.prototype.render = function () {
        var contextValue = {
            rightSidebarWidth: this.props.rightSidebarWidth,
            leftSidebarWidth: this.props.leftSidebarWidth,
            timeSteps: this.props.timeSteps,
            registerScroll: this.props.registerScroll,
            timeZone: this.props.timeZone
        };
        return (0, jsx_runtime_1.jsx)(Provider, __assign({ value: contextValue }, { children: this.props.children }), void 0);
    };
    TimelineHeadersProvider.propTypes = {
        children: prop_types_1.default.element.isRequired,
        rightSidebarWidth: prop_types_1.default.number,
        leftSidebarWidth: prop_types_1.default.number.isRequired,
        //TODO: maybe this should be skipped?
        timeSteps: prop_types_1.default.object.isRequired,
        registerScroll: prop_types_1.default.func.isRequired,
        timeZone: prop_types_1.default.string.isRequired
    };
    return TimelineHeadersProvider;
}(react_1.default.Component));
exports.TimelineHeadersProvider = TimelineHeadersProvider;
exports.TimelineHeadersConsumer = Consumer;
