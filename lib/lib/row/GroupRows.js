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
var prop_types_1 = __importDefault(require("prop-types"));
var react_1 = require("react");
var GroupRow_1 = __importDefault(require("./GroupRow"));
var GroupRows = /** @class */ (function (_super) {
    __extends(GroupRows, _super);
    function GroupRows() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupRows.prototype.shouldComponentUpdate = function (nextProps) {
        return !(nextProps.canvasWidth === this.props.canvasWidth &&
            nextProps.lineCount === this.props.lineCount &&
            nextProps.groupHeights === this.props.groupHeights &&
            nextProps.groups === this.props.groups);
    };
    GroupRows.prototype.render = function () {
        var _a = this.props, canvasWidth = _a.canvasWidth, lineCount = _a.lineCount, groupHeights = _a.groupHeights, onRowClick = _a.onRowClick, onRowDoubleClick = _a.onRowDoubleClick, clickTolerance = _a.clickTolerance, groups = _a.groups, horizontalLineClassNamesForGroup = _a.horizontalLineClassNamesForGroup, onRowContextClick = _a.onRowContextClick;
        var lines = [];
        var _loop_1 = function (i) {
            lines.push((0, jsx_runtime_1.jsx)(GroupRow_1.default, { clickTolerance: clickTolerance, onContextMenu: function (evt) { return onRowContextClick(evt, i); }, onClick: function (evt) { return onRowClick(evt, i); }, onDoubleClick: function (evt) { return onRowDoubleClick(evt, i); }, isEvenRow: i % 2 === 0, group: groups[i], horizontalLineClassNamesForGroup: horizontalLineClassNamesForGroup, style: {
                    width: canvasWidth + "px",
                    height: groupHeights[i] + "px"
                } }, "horizontal-line-" + i));
        };
        for (var i = 0; i < lineCount; i++) {
            _loop_1(i);
        }
        return (0, jsx_runtime_1.jsx)("div", __assign({ className: "rct-horizontal-lines" }, { children: lines }), void 0);
    };
    GroupRows.propTypes = {
        canvasWidth: prop_types_1.default.number.isRequired,
        lineCount: prop_types_1.default.number.isRequired,
        groupHeights: prop_types_1.default.array.isRequired,
        onRowClick: prop_types_1.default.func.isRequired,
        onRowDoubleClick: prop_types_1.default.func.isRequired,
        clickTolerance: prop_types_1.default.number.isRequired,
        groups: prop_types_1.default.array.isRequired,
        horizontalLineClassNamesForGroup: prop_types_1.default.func,
        onRowContextClick: prop_types_1.default.func.isRequired,
    };
    return GroupRows;
}(react_1.Component));
exports.default = GroupRows;
