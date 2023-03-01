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
var classnames_1 = __importDefault(require("classnames"));
var HeadersContext_1 = require("./HeadersContext");
var prop_types_1 = __importDefault(require("prop-types"));
var SidebarHeader_1 = __importDefault(require("./SidebarHeader"));
var constants_1 = require("./constants");
var TimelineHeaders = /** @class */ (function (_super) {
    __extends(TimelineHeaders, _super);
    function TimelineHeaders(props) {
        var _this = _super.call(this, props) || this;
        _this.getRootStyle = function () {
            return __assign(__assign({}, _this.props.style), { display: 'flex', width: '100%' });
        };
        _this.getCalendarHeaderStyle = function () {
            var _a = _this.props, leftSidebarWidth = _a.leftSidebarWidth, rightSidebarWidth = _a.rightSidebarWidth, calendarHeaderStyle = _a.calendarHeaderStyle;
            return __assign(__assign({}, calendarHeaderStyle), { overflow: 'hidden', width: "calc(100% - " + (leftSidebarWidth + rightSidebarWidth) + "px)" });
        };
        _this.handleRootRef = function (element) {
            if (_this.props.headerRef) {
                _this.props.headerRef(element);
            }
        };
        /**
         * check if child of type SidebarHeader
         * refer to for explanation https://github.com/gaearon/react-hot-loader#checking-element-types
         */
        _this.isSidebarHeader = function (child) {
            if (child.type === undefined)
                return false;
            return child.type.secretKey === SidebarHeader_1.default.secretKey;
        };
        return _this;
    }
    TimelineHeaders.prototype.render = function () {
        var _this = this;
        var rightSidebarHeader;
        var leftSidebarHeader;
        var calendarHeaders = [];
        var children = Array.isArray(this.props.children)
            ? this.props.children.filter(function (c) { return c; })
            : [this.props.children];
        react_1.default.Children.map(children, function (child) {
            if (_this.isSidebarHeader(child)) {
                if (child.props.variant === constants_1.RIGHT_VARIANT) {
                    rightSidebarHeader = child;
                }
                else {
                    leftSidebarHeader = child;
                }
            }
            else {
                calendarHeaders.push(child);
            }
        });
        if (!leftSidebarHeader) {
            leftSidebarHeader = (0, jsx_runtime_1.jsx)(SidebarHeader_1.default, {}, void 0);
        }
        if (!rightSidebarHeader && this.props.rightSidebarWidth) {
            rightSidebarHeader = (0, jsx_runtime_1.jsx)(SidebarHeader_1.default, { variant: "right" }, void 0);
        }
        return ((0, jsx_runtime_1.jsxs)("div", __assign({ ref: this.handleRootRef, "data-testid": "headerRootDiv", style: this.getRootStyle(), className: (0, classnames_1.default)('rct-header-root', this.props.className) }, { children: [leftSidebarHeader, (0, jsx_runtime_1.jsx)("div", __assign({ ref: this.props.registerScroll, style: this.getCalendarHeaderStyle(), className: (0, classnames_1.default)('rct-calendar-header', this.props.calendarHeaderClassName), "data-testid": "headerContainer" }, { children: calendarHeaders }), void 0), rightSidebarHeader] }), void 0));
    };
    TimelineHeaders.propTypes = {
        registerScroll: prop_types_1.default.func.isRequired,
        leftSidebarWidth: prop_types_1.default.number.isRequired,
        rightSidebarWidth: prop_types_1.default.number.isRequired,
        style: prop_types_1.default.object,
        children: prop_types_1.default.node,
        className: prop_types_1.default.string,
        calendarHeaderStyle: prop_types_1.default.object,
        calendarHeaderClassName: prop_types_1.default.string,
        headerRef: prop_types_1.default.func,
        timeZone: prop_types_1.default.string.isRequired,
    };
    TimelineHeaders.defaultProps = {
        style: {},
        calendarHeaderStyle: {},
        calendarHeaderClassName: "",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    return TimelineHeaders;
}(react_1.default.Component));
var TimelineHeadersWrapper = function (_a) {
    var children = _a.children, style = _a.style, className = _a.className, calendarHeaderStyle = _a.calendarHeaderStyle, calendarHeaderClassName = _a.calendarHeaderClassName;
    return ((0, jsx_runtime_1.jsx)(HeadersContext_1.TimelineHeadersConsumer, { children: function (_a) {
            var leftSidebarWidth = _a.leftSidebarWidth, rightSidebarWidth = _a.rightSidebarWidth, registerScroll = _a.registerScroll;
            return ((0, jsx_runtime_1.jsx)(TimelineHeaders, __assign({ leftSidebarWidth: leftSidebarWidth, rightSidebarWidth: rightSidebarWidth, registerScroll: registerScroll, style: style, className: className, calendarHeaderStyle: calendarHeaderStyle, calendarHeaderClassName: calendarHeaderClassName }, { children: children }), void 0));
        } }, void 0));
};
TimelineHeadersWrapper.propTypes = {
    style: prop_types_1.default.object,
    children: prop_types_1.default.node,
    className: prop_types_1.default.string,
    calendarHeaderStyle: prop_types_1.default.object,
    calendarHeaderClassName: prop_types_1.default.string
};
TimelineHeadersWrapper.secretKey = "TimelineHeaders";
exports.default = TimelineHeadersWrapper;
