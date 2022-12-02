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
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { _get, arraysEqual } from '../utility/generic';
var Sidebar = /** @class */ (function (_super) {
    __extends(Sidebar, _super);
    function Sidebar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sidebar.prototype.shouldComponentUpdate = function (nextProps) {
        return !(nextProps.keys === this.props.keys &&
            nextProps.width === this.props.width &&
            nextProps.height === this.props.height &&
            arraysEqual(nextProps.groups, this.props.groups) &&
            arraysEqual(nextProps.groupHeights, this.props.groupHeights));
    };
    Sidebar.prototype.renderGroupContent = function (group, isRightSidebar, groupTitleKey, groupRightTitleKey) {
        if (this.props.groupRenderer) {
            return React.createElement(this.props.groupRenderer, {
                group: group,
                isRightSidebar: isRightSidebar
            });
        }
        else {
            return _get(group, isRightSidebar ? groupRightTitleKey : groupTitleKey);
        }
    };
    Sidebar.prototype.render = function () {
        var _this = this;
        var _a = this.props, width = _a.width, groupHeights = _a.groupHeights, height = _a.height, isRightSidebar = _a.isRightSidebar;
        var _b = this.props.keys, groupIdKey = _b.groupIdKey, groupTitleKey = _b.groupTitleKey, groupRightTitleKey = _b.groupRightTitleKey;
        var sidebarStyle = {
            width: width + "px",
            height: height + "px"
        };
        var groupsStyle = {
            width: width + "px"
        };
        var groupLines = this.props.groups.map(function (group, index) {
            var elementStyle = {
                height: groupHeights[index] + "px",
                lineHeight: groupHeights[index] + "px"
            };
            return (_jsx("div", __assign({ "data-testid": "sidebar", className: 'rct-sidebar-row rct-sidebar-row-' + (index % 2 === 0 ? 'even' : 'odd'), style: elementStyle }, { children: _this.renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey) }), _get(group, groupIdKey)));
        });
        return (_jsx("div", __assign({ className: 'rct-sidebar' + (isRightSidebar ? ' rct-sidebar-right' : ''), style: sidebarStyle }, { children: _jsx("div", __assign({ style: groupsStyle }, { children: groupLines }), void 0) }), void 0));
    };
    Sidebar.propTypes = {
        groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        groupHeights: PropTypes.array.isRequired,
        keys: PropTypes.object.isRequired,
        groupRenderer: PropTypes.func,
        isRightSidebar: PropTypes.bool,
    };
    return Sidebar;
}(Component));
export default Sidebar;
