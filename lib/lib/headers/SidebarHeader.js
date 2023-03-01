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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var HeadersContext_1 = require("./HeadersContext");
var constants_1 = require("./constants");
var SidebarHeader = /** @class */ (function (_super) {
    __extends(SidebarHeader, _super);
    function SidebarHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getRootProps = function (props) {
            if (props === void 0) { props = {}; }
            var style = props.style;
            var width = _this.props.variant === constants_1.RIGHT_VARIANT
                ? _this.props.rightSidebarWidth
                : _this.props.leftSidebarWidth;
            return {
                style: __assign(__assign({}, style), { width: width })
            };
        };
        _this.getStateAndHelpers = function () {
            return {
                getRootProps: _this.getRootProps,
                data: _this.props.headerData,
            };
        };
        return _this;
    }
    SidebarHeader.prototype.render = function () {
        var props = this.getStateAndHelpers();
        var Renderer = this.props.children;
        return (0, jsx_runtime_1.jsx)(Renderer, __assign({}, props), void 0);
    };
    SidebarHeader.propTypes = {
        children: prop_types_1.default.func.isRequired,
        rightSidebarWidth: prop_types_1.default.number,
        leftSidebarWidth: prop_types_1.default.number.isRequired,
        variant: prop_types_1.default.string,
        headerData: prop_types_1.default.object
    };
    SidebarHeader.defaultProps = {
        headerData: undefined
    };
    return SidebarHeader;
}(react_1.default.PureComponent));
var SidebarWrapper = function (_a) {
    var children = _a.children, variant = _a.variant, headerData = _a.headerData;
    return ((0, jsx_runtime_1.jsx)(HeadersContext_1.TimelineHeadersConsumer, { children: function (_a) {
            var leftSidebarWidth = _a.leftSidebarWidth, rightSidebarWidth = _a.rightSidebarWidth;
            return ((0, jsx_runtime_1.jsx)(SidebarHeader, { leftSidebarWidth: leftSidebarWidth, rightSidebarWidth: rightSidebarWidth, children: children, variant: variant, headerData: headerData }, void 0));
        } }, void 0));
};
SidebarWrapper.propTypes = {
    children: prop_types_1.default.func.isRequired,
    variant: prop_types_1.default.string,
    headerData: prop_types_1.default.object
};
SidebarWrapper.defaultProps = {
    variant: constants_1.LEFT_VARIANT,
    children: function (_a) {
        var getRootProps = _a.getRootProps;
        return (0, jsx_runtime_1.jsx)("div", __assign({ "data-testid": "sidebarHeader" }, getRootProps()), void 0);
    }
};
SidebarWrapper.secretKey = "SidebarHeader";
exports.default = SidebarWrapper;
