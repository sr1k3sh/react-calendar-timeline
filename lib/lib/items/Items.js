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
var Item_1 = __importDefault(require("./Item"));
// import ItemGroup from './ItemGroup'
var generic_1 = require("../utility/generic");
var calendar_1 = require("../utility/calendar");
var canResizeLeft = function (item, canResize) {
    var value = (0, generic_1._get)(item, 'canResize') !== undefined ? (0, generic_1._get)(item, 'canResize') : canResize;
    return value === 'left' || value === 'both';
};
var canResizeRight = function (item, canResize) {
    var value = (0, generic_1._get)(item, 'canResize') !== undefined ? (0, generic_1._get)(item, 'canResize') : canResize;
    return value === 'right' || value === 'both' || value === true;
};
var Items = /** @class */ (function (_super) {
    __extends(Items, _super);
    function Items() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Items.prototype.shouldComponentUpdate = function (nextProps) {
        return !((0, generic_1.arraysEqual)(nextProps.groups, this.props.groups) &&
            (0, generic_1.arraysEqual)(nextProps.items, this.props.items) &&
            (0, generic_1.arraysEqual)(nextProps.dimensionItems, this.props.dimensionItems) &&
            nextProps.keys === this.props.keys &&
            nextProps.canvasTimeStart === this.props.canvasTimeStart &&
            nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
            nextProps.canvasWidth === this.props.canvasWidth &&
            nextProps.selectedItem === this.props.selectedItem &&
            nextProps.selected === this.props.selected &&
            nextProps.dragSnap === this.props.dragSnap &&
            nextProps.minResizeWidth === this.props.minResizeWidth &&
            nextProps.canChangeGroup === this.props.canChangeGroup &&
            nextProps.canMove === this.props.canMove &&
            nextProps.canResize === this.props.canResize &&
            nextProps.canSelect === this.props.canSelect);
    };
    Items.prototype.isSelected = function (item, itemIdKey) {
        if (!this.props.selected) {
            return this.props.selectedItem === (0, generic_1._get)(item, itemIdKey);
        }
        else {
            var target = (0, generic_1._get)(item, itemIdKey);
            return this.props.selected.includes(target);
        }
    };
    Items.prototype.getVisibleItems = function (canvasTimeStart, canvasTimeEnd) {
        var _a = this.props, keys = _a.keys, items = _a.items;
        return (0, calendar_1.getVisibleItems)(items, canvasTimeStart, canvasTimeEnd, keys);
    };
    Items.prototype.render = function () {
        var _this = this;
        var _a = this.props, canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd, dimensionItems = _a.dimensionItems, keys = _a.keys, groups = _a.groups;
        var itemIdKey = keys.itemIdKey, itemGroupKey = keys.itemGroupKey;
        var groupOrders = (0, calendar_1.getGroupOrders)(groups, keys);
        var visibleItems = this.getVisibleItems(canvasTimeStart, canvasTimeEnd, groupOrders);
        var sortedDimensionItems = (0, generic_1.keyBy)(dimensionItems, 'id');
        return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "rct-items" }, { children: visibleItems
                .filter(function (item) { return sortedDimensionItems[(0, generic_1._get)(item, itemIdKey)]; })
                .map(function (item) { return ((0, jsx_runtime_1.jsx)(Item_1.default, { item: item, keys: _this.props.keys, order: groupOrders[(0, generic_1._get)(item, itemGroupKey)], dimensions: sortedDimensionItems[(0, generic_1._get)(item, itemIdKey)].dimensions, selected: _this.isSelected(item, itemIdKey), canChangeGroup: (0, generic_1._get)(item, 'canChangeGroup') !== undefined
                    ? (0, generic_1._get)(item, 'canChangeGroup')
                    : _this.props.canChangeGroup, canMove: (0, generic_1._get)(item, 'canMove') !== undefined
                    ? (0, generic_1._get)(item, 'canMove')
                    : _this.props.canMove, canResizeLeft: canResizeLeft(item, _this.props.canResize), canResizeRight: canResizeRight(item, _this.props.canResize), canSelect: (0, generic_1._get)(item, 'canSelect') !== undefined
                    ? (0, generic_1._get)(item, 'canSelect')
                    : _this.props.canSelect, useResizeHandle: _this.props.useResizeHandle, groupTops: _this.props.groupTops, canvasTimeStart: _this.props.canvasTimeStart, canvasTimeEnd: _this.props.canvasTimeEnd, canvasWidth: _this.props.canvasWidth, dragSnap: _this.props.dragSnap, minResizeWidth: _this.props.minResizeWidth, onResizing: _this.props.itemResizing, onResized: _this.props.itemResized, moveResizeValidator: _this.props.moveResizeValidator, onDrag: _this.props.itemDrag, onDrop: _this.props.itemDrop, onItemDoubleClick: _this.props.onItemDoubleClick, onContextMenu: _this.props.onItemContextMenu, onSelect: _this.props.itemSelect, itemRenderer: _this.props.itemRenderer, scrollRef: _this.props.scrollRef }, (0, generic_1._get)(item, itemIdKey))); }) }), void 0));
    };
    Items.propTypes = {
        groups: prop_types_1.default.oneOfType([prop_types_1.default.array, prop_types_1.default.object]).isRequired,
        items: prop_types_1.default.oneOfType([prop_types_1.default.array, prop_types_1.default.object]).isRequired,
        canvasTimeStart: prop_types_1.default.number.isRequired,
        canvasTimeEnd: prop_types_1.default.number.isRequired,
        canvasWidth: prop_types_1.default.number.isRequired,
        dragSnap: prop_types_1.default.number,
        minResizeWidth: prop_types_1.default.number,
        selectedItem: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.number]),
        canChangeGroup: prop_types_1.default.bool.isRequired,
        canMove: prop_types_1.default.bool.isRequired,
        canResize: prop_types_1.default.oneOf([true, false, 'left', 'right', 'both']),
        canSelect: prop_types_1.default.bool,
        keys: prop_types_1.default.object.isRequired,
        moveResizeValidator: prop_types_1.default.func,
        itemSelect: prop_types_1.default.func,
        itemDrag: prop_types_1.default.func,
        itemDrop: prop_types_1.default.func,
        itemResizing: prop_types_1.default.func,
        itemResized: prop_types_1.default.func,
        onItemDoubleClick: prop_types_1.default.func,
        onItemContextMenu: prop_types_1.default.func,
        itemRenderer: prop_types_1.default.func,
        selected: prop_types_1.default.array,
        dimensionItems: prop_types_1.default.array,
        groupTops: prop_types_1.default.array,
        useResizeHandle: prop_types_1.default.bool,
        scrollRef: prop_types_1.default.object
    };
    Items.defaultProps = {
        selected: []
    };
    return Items;
}(react_1.Component));
exports.default = Items;
