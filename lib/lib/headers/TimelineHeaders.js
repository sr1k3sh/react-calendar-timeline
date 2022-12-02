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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import classNames from 'classnames';
import { TimelineHeadersConsumer } from './HeadersContext';
import PropTypes from 'prop-types';
import SidebarHeader from './SidebarHeader';
import { RIGHT_VARIANT } from './constants';
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
            return child.type.secretKey === SidebarHeader.secretKey;
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
        React.Children.map(children, function (child) {
            if (_this.isSidebarHeader(child)) {
                if (child.props.variant === RIGHT_VARIANT) {
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
            leftSidebarHeader = _jsx(SidebarHeader, {}, void 0);
        }
        if (!rightSidebarHeader && this.props.rightSidebarWidth) {
            rightSidebarHeader = _jsx(SidebarHeader, { variant: "right" }, void 0);
        }
        return (_jsxs("div", __assign({ ref: this.handleRootRef, "data-testid": "headerRootDiv", style: this.getRootStyle(), className: classNames('rct-header-root', this.props.className) }, { children: [leftSidebarHeader, _jsx("div", __assign({ ref: this.props.registerScroll, style: this.getCalendarHeaderStyle(), className: classNames('rct-calendar-header', this.props.calendarHeaderClassName), "data-testid": "headerContainer" }, { children: calendarHeaders }), void 0), rightSidebarHeader] }), void 0));
    };
    TimelineHeaders.propTypes = {
        registerScroll: PropTypes.func.isRequired,
        leftSidebarWidth: PropTypes.number.isRequired,
        rightSidebarWidth: PropTypes.number.isRequired,
        style: PropTypes.object,
        children: PropTypes.node,
        className: PropTypes.string,
        calendarHeaderStyle: PropTypes.object,
        calendarHeaderClassName: PropTypes.string,
        headerRef: PropTypes.func
    };
    TimelineHeaders.defaultProps = {
        style: {},
        calendarHeaderStyle: {},
        calendarHeaderClassName: "",
    };
    return TimelineHeaders;
}(React.Component));
var TimelineHeadersWrapper = function (_a) {
    var children = _a.children, style = _a.style, className = _a.className, calendarHeaderStyle = _a.calendarHeaderStyle, calendarHeaderClassName = _a.calendarHeaderClassName;
    return (_jsx(TimelineHeadersConsumer, { children: function (_a) {
            var leftSidebarWidth = _a.leftSidebarWidth, rightSidebarWidth = _a.rightSidebarWidth, registerScroll = _a.registerScroll;
            return (_jsx(TimelineHeaders, __assign({ leftSidebarWidth: leftSidebarWidth, rightSidebarWidth: rightSidebarWidth, registerScroll: registerScroll, style: style, className: className, calendarHeaderStyle: calendarHeaderStyle, calendarHeaderClassName: calendarHeaderClassName }, { children: children }), void 0));
        } }, void 0));
};
TimelineHeadersWrapper.propTypes = {
    style: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    calendarHeaderStyle: PropTypes.object,
    calendarHeaderClassName: PropTypes.string
};
TimelineHeadersWrapper.secretKey = "TimelineHeaders";
export default TimelineHeadersWrapper;
