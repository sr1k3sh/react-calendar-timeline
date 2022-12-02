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
import { Component } from 'react';
import Item from './Item';
// import ItemGroup from './ItemGroup'
import { _get, arraysEqual, keyBy } from '../utility/generic';
import { getGroupOrders, getVisibleItems } from '../utility/calendar';
var canResizeLeft = function (item, canResize) {
    var value = _get(item, 'canResize') !== undefined ? _get(item, 'canResize') : canResize;
    return value === 'left' || value === 'both';
};
var canResizeRight = function (item, canResize) {
    var value = _get(item, 'canResize') !== undefined ? _get(item, 'canResize') : canResize;
    return value === 'right' || value === 'both' || value === true;
};
var Items = /** @class */ (function (_super) {
    __extends(Items, _super);
    function Items() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Items.prototype.shouldComponentUpdate = function (nextProps) {
        return !(arraysEqual(nextProps.groups, this.props.groups) &&
            arraysEqual(nextProps.items, this.props.items) &&
            arraysEqual(nextProps.dimensionItems, this.props.dimensionItems) &&
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
            return this.props.selectedItem === _get(item, itemIdKey);
        }
        else {
            var target = _get(item, itemIdKey);
            return this.props.selected.includes(target);
        }
    };
    Items.prototype.getVisibleItems = function (canvasTimeStart, canvasTimeEnd) {
        var _a = this.props, keys = _a.keys, items = _a.items;
        return getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys);
    };
    Items.prototype.render = function () {
        var _this = this;
        var _a = this.props, canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd, dimensionItems = _a.dimensionItems, keys = _a.keys, groups = _a.groups;
        var itemIdKey = keys.itemIdKey, itemGroupKey = keys.itemGroupKey;
        var groupOrders = getGroupOrders(groups, keys);
        var visibleItems = this.getVisibleItems(canvasTimeStart, canvasTimeEnd, groupOrders);
        var sortedDimensionItems = keyBy(dimensionItems, 'id');
        return (_jsx("div", __assign({ className: "rct-items" }, { children: visibleItems
                .filter(function (item) { return sortedDimensionItems[_get(item, itemIdKey)]; })
                .map(function (item) { return (_jsx(Item, { item: item, keys: _this.props.keys, order: groupOrders[_get(item, itemGroupKey)], dimensions: sortedDimensionItems[_get(item, itemIdKey)].dimensions, selected: _this.isSelected(item, itemIdKey), canChangeGroup: _get(item, 'canChangeGroup') !== undefined
                    ? _get(item, 'canChangeGroup')
                    : _this.props.canChangeGroup, canMove: _get(item, 'canMove') !== undefined
                    ? _get(item, 'canMove')
                    : _this.props.canMove, canResizeLeft: canResizeLeft(item, _this.props.canResize), canResizeRight: canResizeRight(item, _this.props.canResize), canSelect: _get(item, 'canSelect') !== undefined
                    ? _get(item, 'canSelect')
                    : _this.props.canSelect, useResizeHandle: _this.props.useResizeHandle, groupTops: _this.props.groupTops, canvasTimeStart: _this.props.canvasTimeStart, canvasTimeEnd: _this.props.canvasTimeEnd, canvasWidth: _this.props.canvasWidth, dragSnap: _this.props.dragSnap, minResizeWidth: _this.props.minResizeWidth, onResizing: _this.props.itemResizing, onResized: _this.props.itemResized, moveResizeValidator: _this.props.moveResizeValidator, onDrag: _this.props.itemDrag, onDrop: _this.props.itemDrop, onItemDoubleClick: _this.props.onItemDoubleClick, onContextMenu: _this.props.onItemContextMenu, onSelect: _this.props.itemSelect, itemRenderer: _this.props.itemRenderer, scrollRef: _this.props.scrollRef }, _get(item, itemIdKey))); }) }), void 0));
    };
    Items.propTypes = {
        groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
        items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
        canvasTimeStart: PropTypes.number.isRequired,
        canvasTimeEnd: PropTypes.number.isRequired,
        canvasWidth: PropTypes.number.isRequired,
        dragSnap: PropTypes.number,
        minResizeWidth: PropTypes.number,
        selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        canChangeGroup: PropTypes.bool.isRequired,
        canMove: PropTypes.bool.isRequired,
        canResize: PropTypes.oneOf([true, false, 'left', 'right', 'both']),
        canSelect: PropTypes.bool,
        keys: PropTypes.object.isRequired,
        moveResizeValidator: PropTypes.func,
        itemSelect: PropTypes.func,
        itemDrag: PropTypes.func,
        itemDrop: PropTypes.func,
        itemResizing: PropTypes.func,
        itemResized: PropTypes.func,
        onItemDoubleClick: PropTypes.func,
        onItemContextMenu: PropTypes.func,
        itemRenderer: PropTypes.func,
        selected: PropTypes.array,
        dimensionItems: PropTypes.array,
        groupTops: PropTypes.array,
        useResizeHandle: PropTypes.bool,
        scrollRef: PropTypes.object
    };
    Items.defaultProps = {
        selected: []
    };
    return Items;
}(Component));
export default Items;
