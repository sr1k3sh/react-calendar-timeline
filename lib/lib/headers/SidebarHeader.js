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
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { TimelineHeadersConsumer } from './HeadersContext';
import { LEFT_VARIANT, RIGHT_VARIANT } from './constants';
var SidebarHeader = /** @class */ (function (_super) {
    __extends(SidebarHeader, _super);
    function SidebarHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getRootProps = function (props) {
            if (props === void 0) { props = {}; }
            var style = props.style;
            var width = _this.props.variant === RIGHT_VARIANT
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
        return _jsx(Renderer, __assign({}, props), void 0);
    };
    SidebarHeader.propTypes = {
        children: PropTypes.func.isRequired,
        rightSidebarWidth: PropTypes.number,
        leftSidebarWidth: PropTypes.number.isRequired,
        variant: PropTypes.string,
        headerData: PropTypes.object
    };
    SidebarHeader.defaultProps = {
        headerData: undefined
    };
    return SidebarHeader;
}(React.PureComponent));
var SidebarWrapper = function (_a) {
    var children = _a.children, variant = _a.variant, headerData = _a.headerData;
    return (_jsx(TimelineHeadersConsumer, { children: function (_a) {
            var leftSidebarWidth = _a.leftSidebarWidth, rightSidebarWidth = _a.rightSidebarWidth;
            return (_jsx(SidebarHeader, { leftSidebarWidth: leftSidebarWidth, rightSidebarWidth: rightSidebarWidth, children: children, variant: variant, headerData: headerData }, void 0));
        } }, void 0));
};
SidebarWrapper.propTypes = {
    children: PropTypes.func.isRequired,
    variant: PropTypes.string,
    headerData: PropTypes.object
};
SidebarWrapper.defaultProps = {
    variant: LEFT_VARIANT,
    children: function (_a) {
        var getRootProps = _a.getRootProps;
        return _jsx("div", __assign({ "data-testid": "sidebarHeader" }, getRootProps()), void 0);
    }
};
SidebarWrapper.secretKey = "SidebarHeader";
export default SidebarWrapper;
