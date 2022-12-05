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
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Items from './items/Items';
import Sidebar from './layout/Sidebar';
import Columns from './columns/Columns';
import GroupRows from './row/GroupRows';
import ScrollElement from './scroll/ScrollElement';
import MarkerCanvas from './markers/MarkerCanvas';
import windowResizeDetector from '../resize-detector/window';
import { getMinUnit, calculateTimeForXPosition, calculateScrollCanvas, getCanvasBoundariesFromVisibleTime, getCanvasWidth, stackTimelineItems } from './utility/calendar';
import { _get, _length } from './utility/generic';
import { defaultKeys, defaultTimeSteps, defaultHeaderLabelFormats, defaultSubHeaderLabelFormats } from './default-config';
import { TimelineStateProvider } from './timeline/TimelineStateContext';
import { TimelineMarkersProvider } from './markers/TimelineMarkersContext';
import { TimelineHeadersProvider } from './headers/HeadersContext';
import TimelineHeaders from './headers/TimelineHeaders';
import DateHeader from './headers/DateHeader';
import { getTime } from 'date-fns';
var ReactCalendarTimeline = /** @class */ (function (_super) {
    __extends(ReactCalendarTimeline, _super);
    function ReactCalendarTimeline(props) {
        var _this = _super.call(this, props) || this;
        _this.getTimelineContext = function () {
            var _a = _this.state, width = _a.width, visibleTimeStart = _a.visibleTimeStart, visibleTimeEnd = _a.visibleTimeEnd, canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd;
            return {
                timelineWidth: width,
                visibleTimeStart: visibleTimeStart,
                visibleTimeEnd: visibleTimeEnd,
                canvasTimeStart: canvasTimeStart,
                canvasTimeEnd: canvasTimeEnd
            };
        };
        _this.getTimelineUnit = function () {
            var _a = _this.state, width = _a.width, visibleTimeStart = _a.visibleTimeStart, visibleTimeEnd = _a.visibleTimeEnd;
            var timeSteps = _this.props.timeSteps;
            var zoom = visibleTimeEnd - visibleTimeStart;
            var minUnit = getMinUnit(zoom, width, timeSteps);
            return minUnit;
        };
        _this.resize = function (props) {
            if (props === void 0) { props = _this.props; }
            var containerWidth = _this.container.getBoundingClientRect().width;
            var width = containerWidth - props.sidebarWidth - props.rightSidebarWidth;
            var canvasWidth = getCanvasWidth(width, props.buffer);
            var _a = stackTimelineItems(props.items, props.groups, canvasWidth, _this.state.canvasTimeStart, _this.state.canvasTimeEnd, props.keys, props.lineHeight, props.itemHeightRatio, props.stackItems, _this.state.draggingItem, _this.state.resizingItem, _this.state.dragTime, _this.state.resizingEdge, _this.state.resizeTime, _this.state.newGroupOrder), dimensionItems = _a.dimensionItems, height = _a.height, groupHeights = _a.groupHeights, groupTops = _a.groupTops;
            // this is needed by dragItem since it uses pageY from the drag events
            // if this was in the context of the scrollElement, this would not be necessary
            _this.setState({
                width: width,
                dimensionItems: dimensionItems,
                height: height,
                groupHeights: groupHeights,
                groupTops: groupTops
            });
            _this.scrollComponent.scrollLeft = width;
            _this.scrollHeaderRef.scrollLeft = width;
        };
        _this.onScroll = function (scrollX) {
            var width = _this.state.width;
            var canvasTimeStart = _this.state.canvasTimeStart;
            var zoom = _this.state.visibleTimeEnd - _this.state.visibleTimeStart;
            var visibleTimeStart = canvasTimeStart + zoom * scrollX / width;
            if (_this.state.visibleTimeStart !== visibleTimeStart ||
                _this.state.visibleTimeEnd !== visibleTimeStart + zoom) {
                _this.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, _this.updateScrollCanvas, _this.getTimelineUnit());
            }
        };
        // called when the visible time changes
        _this.updateScrollCanvas = function (visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, items, groups) {
            if (items === void 0) { items = _this.props.items; }
            if (groups === void 0) { groups = _this.props.groups; }
            _this.setState(calculateScrollCanvas(visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, items, groups, _this.props, _this.state));
        };
        _this.handleWheelZoom = function (speed, xPosition, deltaY) {
            _this.changeZoom(1.0 + speed * deltaY / 500, xPosition / _this.state.width);
        };
        _this.changeZoom = function (scale, offset) {
            if (offset === void 0) { offset = 0.5; }
            var _a = _this.props, minZoom = _a.minZoom, maxZoom = _a.maxZoom;
            var oldZoom = _this.state.visibleTimeEnd - _this.state.visibleTimeStart;
            var newZoom = Math.min(Math.max(Math.round(oldZoom * scale), minZoom), maxZoom); // min 1 min, max 20 years
            var newVisibleTimeStart = Math.round(_this.state.visibleTimeStart + (oldZoom - newZoom) * offset);
            _this.props.onTimeChange(newVisibleTimeStart, newVisibleTimeStart + newZoom, _this.updateScrollCanvas, _this.getTimelineUnit());
        };
        _this.showPeriod = function (from, to) {
            var visibleTimeStart = getTime(from);
            var visibleTimeEnd = getTime(to);
            var zoom = visibleTimeEnd - visibleTimeStart;
            // can't zoom in more than to show one hour
            if (zoom < _this.props.minZoom) {
                return;
            }
            _this.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, _this.updateScrollCanvas, _this.getTimelineUnit());
        };
        _this.selectItem = function (item, clickType, e) {
            if (_this.isItemSelected(item) ||
                (_this.props.itemTouchSendsClick && clickType === 'touch')) {
                if (item && _this.props.onItemClick) {
                    var time = _this.timeFromItemEvent(e);
                    _this.props.onItemClick(item, e, time);
                }
            }
            else {
                _this.setState({ selectedItem: item });
                if (item && _this.props.onItemSelect) {
                    var time = _this.timeFromItemEvent(e);
                    _this.props.onItemSelect(item, e, time);
                }
                else if (item === null && _this.props.onItemDeselect) {
                    _this.props.onItemDeselect(e); // this isnt in the docs. Is this function even used?
                }
            }
        };
        _this.doubleClickItem = function (item, e) {
            if (_this.props.onItemDoubleClick) {
                var time = _this.timeFromItemEvent(e);
                _this.props.onItemDoubleClick(item, e, time);
            }
        };
        _this.contextMenuClickItem = function (item, e) {
            if (_this.props.onItemContextMenu) {
                var time = _this.timeFromItemEvent(e);
                _this.props.onItemContextMenu(item, e, time);
            }
        };
        // TODO: this is very similar to timeFromItemEvent, aside from which element to get offsets
        // from.  Look to consolidate the logic for determining coordinate to time
        // as well as generalizing how we get time from click on the canvas
        _this.getTimeFromRowClickEvent = function (e) {
            var _a = _this.props, dragSnap = _a.dragSnap, buffer = _a.buffer;
            var _b = _this.state, width = _b.width, canvasTimeStart = _b.canvasTimeStart, canvasTimeEnd = _b.canvasTimeEnd;
            // this gives us distance from left of row element, so event is in
            // context of the row element, not client or page
            var offsetX = e.nativeEvent.offsetX;
            var time = calculateTimeForXPosition(canvasTimeStart, canvasTimeEnd, getCanvasWidth(width, buffer), offsetX);
            time = Math.floor(time / dragSnap) * dragSnap;
            return time;
        };
        _this.timeFromItemEvent = function (e) {
            var _a = _this.state, width = _a.width, visibleTimeStart = _a.visibleTimeStart, visibleTimeEnd = _a.visibleTimeEnd;
            var dragSnap = _this.props.dragSnap;
            var scrollComponent = _this.scrollComponent;
            var scrollX = scrollComponent.getBoundingClientRect().left;
            var xRelativeToTimeline = e.clientX - scrollX;
            var relativeItemPosition = xRelativeToTimeline / width;
            var zoom = visibleTimeEnd - visibleTimeStart;
            var timeOffset = relativeItemPosition * zoom;
            var time = Math.round(visibleTimeStart + timeOffset);
            time = Math.floor(time / dragSnap) * dragSnap;
            return time;
        };
        _this.dragItem = function (item, dragTime, newGroupOrder) {
            var newGroup = _this.props.groups[newGroupOrder];
            var keys = _this.props.keys;
            _this.setState({
                draggingItem: item,
                dragTime: dragTime,
                newGroupOrder: newGroupOrder,
                dragGroupTitle: newGroup ? _get(newGroup, keys.groupLabelKey) : ''
            });
            _this.updatingItem({
                eventType: 'move',
                itemId: item,
                time: dragTime,
                newGroupOrder: newGroupOrder
            });
        };
        _this.dropItem = function (item, dragTime, newGroupOrder) {
            _this.setState({ draggingItem: null, dragTime: null, dragGroupTitle: null });
            if (_this.props.onItemMove) {
                _this.props.onItemMove(item, dragTime, newGroupOrder);
            }
        };
        _this.resizingItem = function (item, resizeTime, edge) {
            _this.setState({
                resizingItem: item,
                resizingEdge: edge,
                resizeTime: resizeTime
            });
            _this.updatingItem({
                eventType: 'resize',
                itemId: item,
                time: resizeTime,
                edge: edge
            });
        };
        _this.resizedItem = function (item, resizeTime, edge, timeDelta) {
            _this.setState({ resizingItem: null, resizingEdge: null, resizeTime: null });
            if (_this.props.onItemResize && timeDelta !== 0) {
                _this.props.onItemResize(item, resizeTime, edge);
            }
        };
        _this.updatingItem = function (_a) {
            var eventType = _a.eventType, itemId = _a.itemId, time = _a.time, edge = _a.edge, newGroupOrder = _a.newGroupOrder;
            if (_this.props.onItemDrag) {
                _this.props.onItemDrag({ eventType: eventType, itemId: itemId, time: time, edge: edge, newGroupOrder: newGroupOrder });
            }
        };
        _this.handleRowClick = function (e, rowIndex) {
            // shouldnt this be handled by the user, as far as when to deselect an item?
            if (_this.hasSelectedItem()) {
                _this.selectItem(null);
            }
            if (_this.props.onCanvasClick == null)
                return;
            var time = _this.getTimeFromRowClickEvent(e);
            var groupId = _get(_this.props.groups[rowIndex], _this.props.keys.groupIdKey);
            _this.props.onCanvasClick(groupId, time, e);
        };
        _this.handleRowDoubleClick = function (e, rowIndex) {
            if (_this.props.onCanvasDoubleClick == null)
                return;
            var time = _this.getTimeFromRowClickEvent(e);
            var groupId = _get(_this.props.groups[rowIndex], _this.props.keys.groupIdKey);
            _this.props.onCanvasDoubleClick(groupId, time, e);
        };
        _this.handleScrollContextMenu = function (e, rowIndex) {
            if (_this.props.onCanvasContextMenu == null)
                return;
            var timePosition = _this.getTimeFromRowClickEvent(e);
            var groupId = _get(_this.props.groups[rowIndex], _this.props.keys.groupIdKey);
            if (_this.props.onCanvasContextMenu) {
                e.preventDefault();
                _this.props.onCanvasContextMenu(groupId, timePosition, e);
            }
        };
        _this.handleHeaderRef = function (el) {
            _this.scrollHeaderRef = el;
            _this.props.headerRef(el);
        };
        /**
         * check if child of type TimelineHeader
         * refer to for explanation https://github.com/gaearon/react-hot-loader#checking-element-types
         */
        _this.isTimelineHeader = function (child) {
            if (child.type === undefined)
                return false;
            return child.type.secretKey === TimelineHeaders.secretKey;
        };
        _this.renderHeaders = function () {
            if (_this.props.children) {
                var headerRenderer_1;
                React.Children.map(_this.props.children, function (child) {
                    if (_this.isTimelineHeader(child)) {
                        headerRenderer_1 = child;
                    }
                });
                if (headerRenderer_1) {
                    return headerRenderer_1;
                }
            }
            return (_jsxs(TimelineHeaders, { children: [_jsx(DateHeader, { unit: "primaryHeader" }, void 0), _jsx(DateHeader, {}, void 0)] }, void 0));
        };
        _this.getScrollElementRef = function (el) {
            _this.props.scrollRef(el);
            _this.scrollComponent = el;
        };
        _this.getSelected = _this.getSelected.bind(_this);
        _this.hasSelectedItem = _this.hasSelectedItem.bind(_this);
        _this.isItemSelected = _this.isItemSelected.bind(_this);
        var visibleTimeStart = null;
        var visibleTimeEnd = null;
        if (_this.props.defaultTimeStart && _this.props.defaultTimeEnd) {
            visibleTimeStart = getTime(_this.props.defaultTimeStart);
            visibleTimeEnd = getTime(_this.props.defaultTimeEnd);
        }
        else if (_this.props.visibleTimeStart && _this.props.visibleTimeEnd) {
            visibleTimeStart = _this.props.visibleTimeStart;
            visibleTimeEnd = _this.props.visibleTimeEnd;
        }
        else {
            //throwing an error because neither default or visible time props provided
            throw new Error('You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline');
        }
        var _a = getCanvasBoundariesFromVisibleTime(visibleTimeStart, visibleTimeEnd, props.buffer), canvasTimeStart = _a[0], canvasTimeEnd = _a[1];
        _this.state = {
            width: 1000,
            visibleTimeStart: visibleTimeStart,
            visibleTimeEnd: visibleTimeEnd,
            canvasTimeStart: canvasTimeStart,
            canvasTimeEnd: canvasTimeEnd,
            selectedItem: null,
            dragTime: null,
            dragGroupTitle: null,
            resizeTime: null,
            resizingItem: null,
            resizingEdge: null
        };
        var canvasWidth = getCanvasWidth(_this.state.width, props.buffer);
        var _b = stackTimelineItems(props.items, props.groups, canvasWidth, _this.state.canvasTimeStart, _this.state.canvasTimeEnd, props.keys, props.lineHeight, props.itemHeightRatio, props.stackItems, _this.state.draggingItem, _this.state.resizingItem, _this.state.dragTime, _this.state.resizingEdge, _this.state.resizeTime, _this.state.newGroupOrder), dimensionItems = _b.dimensionItems, height = _b.height, groupHeights = _b.groupHeights, groupTops = _b.groupTops;
        /* eslint-disable react/no-direct-mutation-state */
        _this.state.dimensionItems = dimensionItems;
        _this.state.height = height;
        _this.state.groupHeights = groupHeights;
        _this.state.groupTops = groupTops;
        return _this;
        /* eslint-enable */
    }
    ReactCalendarTimeline.prototype.getChildContext = function () {
        var _this = this;
        return {
            getTimelineContext: function () {
                return _this.getTimelineContext();
            }
        };
    };
    ReactCalendarTimeline.prototype.componentDidMount = function () {
        this.resize(this.props);
        if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
            this.props.resizeDetector.addListener(this);
        }
        windowResizeDetector.addListener(this);
        this.lastTouchDistance = null;
    };
    ReactCalendarTimeline.prototype.componentWillUnmount = function () {
        if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
            this.props.resizeDetector.removeListener(this);
        }
        windowResizeDetector.removeListener(this);
    };
    ReactCalendarTimeline.getDerivedStateFromProps = function (nextProps, prevState) {
        var visibleTimeStart = nextProps.visibleTimeStart, visibleTimeEnd = nextProps.visibleTimeEnd, items = nextProps.items, groups = nextProps.groups;
        // This is a gross hack pushing items and groups in to state only to allow
        // For the forceUpdate check
        var derivedState = { items: items, groups: groups };
        // if the items or groups have changed we must re-render
        var forceUpdate = items !== prevState.items || groups !== prevState.groups;
        // We are a controlled component
        if (visibleTimeStart && visibleTimeEnd) {
            // Get the new canvas position
            Object.assign(derivedState, calculateScrollCanvas(visibleTimeStart, visibleTimeEnd, forceUpdate, items, groups, nextProps, prevState));
        }
        else if (forceUpdate) {
            // Calculate new item stack position as canvas may have changed
            var canvasWidth = getCanvasWidth(prevState.width, nextProps.buffer);
            Object.assign(derivedState, stackTimelineItems(items, groups, canvasWidth, prevState.canvasTimeStart, prevState.canvasTimeEnd, nextProps.keys, nextProps.lineHeight, nextProps.itemHeightRatio, nextProps.stackItems, prevState.draggingItem, prevState.resizingItem, prevState.dragTime, prevState.resizingEdge, prevState.resizeTime, prevState.newGroupOrder));
        }
        return derivedState;
    };
    ReactCalendarTimeline.prototype.componentDidUpdate = function (prevProps, prevState) {
        var newZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
        var oldZoom = prevState.visibleTimeEnd - prevState.visibleTimeStart;
        // are we changing zoom? Report it!
        if (this.props.onZoom && newZoom !== oldZoom) {
            this.props.onZoom(this.getTimelineContext(), this.getTimelineUnit());
        }
        // The bounds have changed? Report it!
        if (this.props.onBoundsChange &&
            this.state.canvasTimeStart !== prevState.canvasTimeStart) {
            this.props.onBoundsChange(this.state.canvasTimeStart, this.state.canvasTimeStart + newZoom * 3);
        }
        // Check the scroll is correct
        var scrollLeft = Math.round(this.state.width *
            (this.state.visibleTimeStart - this.state.canvasTimeStart) /
            newZoom);
        var componentScrollLeft = Math.round(prevState.width *
            (prevState.visibleTimeStart - prevState.canvasTimeStart) /
            oldZoom);
        if (componentScrollLeft !== scrollLeft) {
            this.scrollComponent.scrollLeft = scrollLeft;
            this.scrollHeaderRef.scrollLeft = scrollLeft;
        }
    };
    ReactCalendarTimeline.prototype.columns = function (canvasTimeStart, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height) {
        return (_jsx(Columns, { canvasTimeStart: canvasTimeStart, canvasTimeEnd: canvasTimeEnd, canvasWidth: canvasWidth, lineCount: _length(this.props.groups), minUnit: minUnit, timeSteps: timeSteps, height: height, verticalLineClassNamesForTime: this.props.verticalLineClassNamesForTime }, void 0));
    };
    ReactCalendarTimeline.prototype.rows = function (canvasWidth, groupHeights, groups) {
        return (_jsx(GroupRows, { groups: groups, canvasWidth: canvasWidth, lineCount: _length(this.props.groups), groupHeights: groupHeights, clickTolerance: this.props.clickTolerance, onRowClick: this.handleRowClick, onRowDoubleClick: this.handleRowDoubleClick, horizontalLineClassNamesForGroup: this.props.horizontalLineClassNamesForGroup, onRowContextClick: this.handleScrollContextMenu }, void 0));
    };
    ReactCalendarTimeline.prototype.items = function (canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops) {
        return (_jsx(Items, { canvasTimeStart: canvasTimeStart, canvasTimeEnd: canvasTimeEnd, canvasWidth: canvasWidth, dimensionItems: dimensionItems, groupTops: groupTops, items: this.props.items, groups: this.props.groups, keys: this.props.keys, selectedItem: this.state.selectedItem, dragSnap: this.props.dragSnap, minResizeWidth: this.props.minResizeWidth, canChangeGroup: this.props.canChangeGroup, canMove: this.props.canMove, canResize: this.props.canResize, useResizeHandle: this.props.useResizeHandle, canSelect: this.props.canSelect, moveResizeValidator: this.props.moveResizeValidator, itemSelect: this.selectItem, itemDrag: this.dragItem, itemDrop: this.dropItem, onItemDoubleClick: this.doubleClickItem, onItemContextMenu: this.props.onItemContextMenu ? this.contextMenuClickItem : undefined, itemResizing: this.resizingItem, itemResized: this.resizedItem, itemRenderer: this.props.itemRenderer, selected: this.props.selected, scrollRef: this.scrollComponent }, void 0));
    };
    ReactCalendarTimeline.prototype.sidebar = function (height, groupHeights) {
        var sidebarWidth = this.props.sidebarWidth;
        return (sidebarWidth && (_jsx(Sidebar, { groups: this.props.groups, groupRenderer: this.props.groupRenderer, keys: this.props.keys, width: sidebarWidth, groupHeights: groupHeights, height: height }, void 0)));
    };
    ReactCalendarTimeline.prototype.rightSidebar = function (height, groupHeights) {
        var rightSidebarWidth = this.props.rightSidebarWidth;
        return (rightSidebarWidth && (_jsx(Sidebar, { groups: this.props.groups, keys: this.props.keys, groupRenderer: this.props.groupRenderer, isRightSidebar: true, width: rightSidebarWidth, groupHeights: groupHeights, height: height }, void 0)));
    };
    ReactCalendarTimeline.prototype.childrenWithProps = function (canvasTimeStart, canvasTimeEnd, canvasWidth, dimensionItems, groupHeights, groupTops, height, visibleTimeStart, visibleTimeEnd, minUnit, timeSteps) {
        var _this = this;
        if (!this.props.children) {
            return null;
        }
        // convert to an array and remove the nulls
        var childArray = Array.isArray(this.props.children)
            ? this.props.children.filter(function (c) { return c; })
            : [this.props.children];
        var childProps = {
            canvasTimeStart: canvasTimeStart,
            canvasTimeEnd: canvasTimeEnd,
            canvasWidth: canvasWidth,
            visibleTimeStart: visibleTimeStart,
            visibleTimeEnd: visibleTimeEnd,
            dimensionItems: dimensionItems,
            items: this.props.items,
            groups: this.props.groups,
            keys: this.props.keys,
            groupHeights: groupHeights,
            groupTops: groupTops,
            selected: this.getSelected(),
            height: height,
            minUnit: minUnit,
            timeSteps: timeSteps
        };
        return React.Children.map(childArray, function (child) {
            if (!_this.isTimelineHeader(child)) {
                return React.cloneElement(child, childProps);
            }
            else {
                return null;
            }
        });
    };
    ReactCalendarTimeline.prototype.getSelected = function () {
        return this.state.selectedItem && !this.props.selected
            ? [this.state.selectedItem]
            : this.props.selected || [];
    };
    ReactCalendarTimeline.prototype.hasSelectedItem = function () {
        if (!Array.isArray(this.props.selected))
            return !!this.state.selectedItem;
        return this.props.selected.length > 0;
    };
    ReactCalendarTimeline.prototype.isItemSelected = function (itemId) {
        var selectedItems = this.getSelected();
        return selectedItems.some(function (i) { return i === itemId; });
    };
    ReactCalendarTimeline.prototype.render = function () {
        var _this = this;
        var _a = this.props, items = _a.items, groups = _a.groups, sidebarWidth = _a.sidebarWidth, rightSidebarWidth = _a.rightSidebarWidth, timeSteps = _a.timeSteps, traditionalZoom = _a.traditionalZoom, buffer = _a.buffer;
        var _b = this.state, draggingItem = _b.draggingItem, resizingItem = _b.resizingItem, width = _b.width, visibleTimeStart = _b.visibleTimeStart, visibleTimeEnd = _b.visibleTimeEnd, canvasTimeStart = _b.canvasTimeStart, canvasTimeEnd = _b.canvasTimeEnd;
        var _c = this.state, dimensionItems = _c.dimensionItems, height = _c.height, groupHeights = _c.groupHeights, groupTops = _c.groupTops;
        var zoom = visibleTimeEnd - visibleTimeStart;
        var canvasWidth = getCanvasWidth(width, buffer);
        var minUnit = getMinUnit(zoom, width, timeSteps);
        var isInteractingWithItem = !!draggingItem || !!resizingItem;
        if (isInteractingWithItem) {
            var stackResults = stackTimelineItems(items, groups, canvasWidth, this.state.canvasTimeStart, this.state.canvasTimeEnd, this.props.keys, this.props.lineHeight, this.props.itemHeightRatio, this.props.stackItems, this.state.draggingItem, this.state.resizingItem, this.state.dragTime, this.state.resizingEdge, this.state.resizeTime, this.state.newGroupOrder);
            dimensionItems = stackResults.dimensionItems;
            height = stackResults.height;
            groupHeights = stackResults.groupHeights;
            groupTops = stackResults.groupTops;
        }
        var outerComponentStyle = {
            height: height + "px"
        };
        return (_jsx(TimelineStateProvider, __assign({ visibleTimeStart: visibleTimeStart, visibleTimeEnd: visibleTimeEnd, canvasTimeStart: canvasTimeStart, canvasTimeEnd: canvasTimeEnd, canvasWidth: canvasWidth, showPeriod: this.showPeriod, timelineUnit: minUnit, timelineWidth: this.state.width }, { children: _jsx(TimelineMarkersProvider, { children: _jsx(TimelineHeadersProvider, __assign({ registerScroll: this.handleHeaderRef, timeSteps: timeSteps, leftSidebarWidth: this.props.sidebarWidth, rightSidebarWidth: this.props.rightSidebarWidth }, { children: _jsxs("div", __assign({ style: this.props.style, ref: function (el) { return (_this.container = el); }, className: "react-calendar-timeline " + this.props.className }, { children: [this.renderHeaders(), _jsxs("div", __assign({ style: outerComponentStyle, className: "rct-outer" }, { children: [sidebarWidth > 0 ? this.sidebar(height, groupHeights) : null, _jsx(ScrollElement, __assign({ scrollRef: this.getScrollElementRef, width: width, height: height, onZoom: this.changeZoom, onWheelZoom: this.handleWheelZoom, traditionalZoom: traditionalZoom, onScroll: this.onScroll, isInteractingWithItem: isInteractingWithItem }, { children: _jsxs(MarkerCanvas, { children: [this.columns(canvasTimeStart, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height), this.rows(canvasWidth, groupHeights, groups), this.items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops), this.childrenWithProps(canvasTimeStart, canvasTimeEnd, canvasWidth, dimensionItems, groupHeights, groupTops, height, visibleTimeStart, visibleTimeEnd, minUnit, timeSteps)] }, void 0) }), void 0), rightSidebarWidth > 0
                                        ? this.rightSidebar(height, groupHeights)
                                        : null] }), void 0)] }), void 0) }), void 0) }, void 0) }), void 0));
    };
    ReactCalendarTimeline.propTypes = {
        groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
        items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
        sidebarWidth: PropTypes.number,
        rightSidebarWidth: PropTypes.number,
        dragSnap: PropTypes.number,
        minResizeWidth: PropTypes.number,
        lineHeight: PropTypes.number,
        itemHeightRatio: PropTypes.number,
        minZoom: PropTypes.number,
        maxZoom: PropTypes.number,
        buffer: PropTypes.number,
        clickTolerance: PropTypes.number,
        canChangeGroup: PropTypes.bool,
        canMove: PropTypes.bool,
        canResize: PropTypes.oneOf([true, false, 'left', 'right', 'both']),
        useResizeHandle: PropTypes.bool,
        canSelect: PropTypes.bool,
        stackItems: PropTypes.bool,
        traditionalZoom: PropTypes.bool,
        itemTouchSendsClick: PropTypes.bool,
        horizontalLineClassNamesForGroup: PropTypes.func,
        onItemMove: PropTypes.func,
        onItemResize: PropTypes.func,
        onItemClick: PropTypes.func,
        onItemSelect: PropTypes.func,
        onItemDeselect: PropTypes.func,
        onCanvasClick: PropTypes.func,
        onItemDoubleClick: PropTypes.func,
        onItemContextMenu: PropTypes.func,
        onCanvasDoubleClick: PropTypes.func,
        onCanvasContextMenu: PropTypes.func,
        onZoom: PropTypes.func,
        onItemDrag: PropTypes.func,
        moveResizeValidator: PropTypes.func,
        itemRenderer: PropTypes.func,
        groupRenderer: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.object,
        keys: PropTypes.shape({
            groupIdKey: PropTypes.string,
            groupTitleKey: PropTypes.string,
            groupLabelKey: PropTypes.string,
            groupRightTitleKey: PropTypes.string,
            itemIdKey: PropTypes.string,
            itemTitleKey: PropTypes.string,
            itemDivTitleKey: PropTypes.string,
            itemGroupKey: PropTypes.string,
            itemTimeStartKey: PropTypes.string,
            itemTimeEndKey: PropTypes.string
        }),
        headerRef: PropTypes.func,
        scrollRef: PropTypes.func,
        timeSteps: PropTypes.shape({
            second: PropTypes.number,
            minute: PropTypes.number,
            hour: PropTypes.number,
            day: PropTypes.number,
            month: PropTypes.number,
            year: PropTypes.number
        }),
        defaultTimeStart: PropTypes.object,
        defaultTimeEnd: PropTypes.object,
        visibleTimeStart: PropTypes.number,
        visibleTimeEnd: PropTypes.number,
        onTimeChange: PropTypes.func,
        onBoundsChange: PropTypes.func,
        selected: PropTypes.array,
        headerLabelFormats: PropTypes.shape({
            yearShort: PropTypes.string,
            yearLong: PropTypes.string,
            monthShort: PropTypes.string,
            monthMedium: PropTypes.string,
            monthMediumLong: PropTypes.string,
            monthLong: PropTypes.string,
            dayShort: PropTypes.string,
            dayLong: PropTypes.string,
            hourShort: PropTypes.string,
            hourMedium: PropTypes.string,
            hourMediumLong: PropTypes.string,
            hourLong: PropTypes.string
        }),
        subHeaderLabelFormats: PropTypes.shape({
            yearShort: PropTypes.string,
            yearLong: PropTypes.string,
            monthShort: PropTypes.string,
            monthMedium: PropTypes.string,
            monthLong: PropTypes.string,
            dayShort: PropTypes.string,
            dayMedium: PropTypes.string,
            dayMediumLong: PropTypes.string,
            dayLong: PropTypes.string,
            hourShort: PropTypes.string,
            hourLong: PropTypes.string,
            minuteShort: PropTypes.string,
            minuteLong: PropTypes.string
        }),
        resizeDetector: PropTypes.shape({
            addListener: PropTypes.func,
            removeListener: PropTypes.func
        }),
        verticalLineClassNamesForTime: PropTypes.func,
        children: PropTypes.node
    };
    ReactCalendarTimeline.defaultProps = {
        sidebarWidth: 150,
        rightSidebarWidth: 0,
        dragSnap: 1000 * 60 * 15,
        minResizeWidth: 20,
        lineHeight: 30,
        itemHeightRatio: 0.65,
        buffer: 3,
        minZoom: 60 * 60 * 1000,
        maxZoom: 5 * 365.24 * 86400 * 1000,
        clickTolerance: 3,
        canChangeGroup: true,
        canMove: true,
        canResize: 'right',
        useResizeHandle: false,
        canSelect: true,
        stackItems: false,
        traditionalZoom: false,
        horizontalLineClassNamesForGroup: null,
        onItemMove: null,
        onItemResize: null,
        onItemClick: null,
        onItemSelect: null,
        onItemDeselect: null,
        onItemDrag: null,
        onCanvasClick: null,
        onItemDoubleClick: null,
        onItemContextMenu: null,
        onCanvasDoubleClick: null,
        onCanvasContextMenu: null,
        onZoom: null,
        resizeDetector: null,
        verticalLineClassNamesForTime: null,
        moveResizeValidator: null,
        dayBackground: null,
        defaultTimeStart: null,
        defaultTimeEnd: null,
        itemTouchSendsClick: false,
        style: {},
        className: '',
        keys: defaultKeys,
        timeSteps: defaultTimeSteps,
        headerRef: function () { },
        scrollRef: function () { },
        // if you pass in visibleTimeStart and visibleTimeEnd, you must also pass onTimeChange(visibleTimeStart, visibleTimeEnd),
        // which needs to update the props visibleTimeStart and visibleTimeEnd to the ones passed
        visibleTimeStart: null,
        visibleTimeEnd: null,
        onTimeChange: function (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) {
            updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
        },
        // called when the canvas area of the calendar changes
        onBoundsChange: null,
        children: null,
        headerLabelFormats: defaultHeaderLabelFormats,
        subHeaderLabelFormats: defaultSubHeaderLabelFormats,
        selected: null
    };
    ReactCalendarTimeline.childContextTypes = {
        getTimelineContext: PropTypes.func
    };
    return ReactCalendarTimeline;
}(Component));
export default ReactCalendarTimeline;
