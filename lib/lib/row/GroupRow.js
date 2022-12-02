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
import { Component } from 'react';
import PropTypes from 'prop-types';
import PreventClickOnDrag from '../interaction/PreventClickOnDrag';
var GroupRow = /** @class */ (function (_super) {
    __extends(GroupRow, _super);
    function GroupRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupRow.prototype.render = function () {
        var _a = this.props, onContextMenu = _a.onContextMenu, onDoubleClick = _a.onDoubleClick, isEvenRow = _a.isEvenRow, style = _a.style, onClick = _a.onClick, clickTolerance = _a.clickTolerance, horizontalLineClassNamesForGroup = _a.horizontalLineClassNamesForGroup, group = _a.group;
        var classNamesForGroup = [];
        if (horizontalLineClassNamesForGroup) {
            classNamesForGroup = horizontalLineClassNamesForGroup(group);
        }
        return (_jsx(PreventClickOnDrag, __assign({ clickTolerance: clickTolerance, onClick: onClick }, { children: _jsx("div", { "data-testid": "group", onContextMenu: onContextMenu, onDoubleClick: onDoubleClick, className: (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') + (classNamesForGroup ? classNamesForGroup.join(' ') : ''), style: style }, void 0) }), void 0));
    };
    GroupRow.propTypes = {
        onClick: PropTypes.func.isRequired,
        onDoubleClick: PropTypes.func.isRequired,
        onContextMenu: PropTypes.func.isRequired,
        isEvenRow: PropTypes.bool.isRequired,
        style: PropTypes.object.isRequired,
        clickTolerance: PropTypes.number.isRequired,
        group: PropTypes.object.isRequired,
        horizontalLineClassNamesForGroup: PropTypes.func
    };
    return GroupRow;
}(Component));
export default GroupRow;
