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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var prop_types_1 = __importDefault(require("prop-types"));
var react_1 = __importStar(require("react"));
var Items_1 = __importDefault(require("./items/Items"));
var Sidebar_1 = __importDefault(require("./layout/Sidebar"));
var Columns_1 = __importDefault(require("./columns/Columns"));
var GroupRows_1 = __importDefault(require("./row/GroupRows"));
var ScrollElement_1 = __importDefault(require("./scroll/ScrollElement"));
var MarkerCanvas_1 = __importDefault(require("./markers/MarkerCanvas"));
var window_1 = __importDefault(require("../resize-detector/window"));
var calendar_1 = require("./utility/calendar");
var generic_1 = require("./utility/generic");
var default_config_1 = require("./default-config");
var TimelineStateContext_1 = require("./timeline/TimelineStateContext");
var TimelineMarkersContext_1 = require("./markers/TimelineMarkersContext");
var HeadersContext_1 = require("./headers/HeadersContext");
var TimelineHeaders_1 = __importDefault(require("./headers/TimelineHeaders"));
var DateHeader_1 = __importDefault(require("./headers/DateHeader"));
var date_fns_1 = require("date-fns");
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
            var minUnit = (0, calendar_1.getMinUnit)(zoom, width, timeSteps);
            return minUnit;
        };
        _this.resize = function (props) {
            if (props === void 0) { props = _this.props; }
            var containerWidth = _this.container.getBoundingClientRect().width;
            var width = containerWidth - props.sidebarWidth - props.rightSidebarWidth;
            var canvasWidth = (0, calendar_1.getCanvasWidth)(width, props.buffer);
            var _a = (0, calendar_1.stackTimelineItems)(props.items, props.groups, canvasWidth, _this.state.canvasTimeStart, _this.state.canvasTimeEnd, props.keys, props.lineHeight, props.itemHeightRatio, props.stackItems, _this.state.draggingItem, _this.state.resizingItem, _this.state.dragTime, _this.state.resizingEdge, _this.state.resizeTime, _this.state.newGroupOrder), dimensionItems = _a.dimensionItems, height = _a.height, groupHeights = _a.groupHeights, groupTops = _a.groupTops;
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
            _this.setState((0, calendar_1.calculateScrollCanvas)(visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, items, groups, _this.props, _this.state));
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
            var visibleTimeStart = (0, date_fns_1.getTime)(from);
            var visibleTimeEnd = (0, date_fns_1.getTime)(to);
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
            var time = (0, calendar_1.calculateTimeForXPosition)(canvasTimeStart, canvasTimeEnd, (0, calendar_1.getCanvasWidth)(width, buffer), offsetX);
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
                dragGroupTitle: newGroup ? (0, generic_1._get)(newGroup, keys.groupLabelKey) : ''
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
            var groupId = (0, generic_1._get)(_this.props.groups[rowIndex], _this.props.keys.groupIdKey);
            _this.props.onCanvasClick(groupId, time, e);
        };
        _this.handleRowDoubleClick = function (e, rowIndex) {
            if (_this.props.onCanvasDoubleClick == null)
                return;
            var time = _this.getTimeFromRowClickEvent(e);
            var groupId = (0, generic_1._get)(_this.props.groups[rowIndex], _this.props.keys.groupIdKey);
            _this.props.onCanvasDoubleClick(groupId, time, e);
        };
        _this.handleScrollContextMenu = function (e, rowIndex) {
            if (_this.props.onCanvasContextMenu == null)
                return;
            var timePosition = _this.getTimeFromRowClickEvent(e);
            var groupId = (0, generic_1._get)(_this.props.groups[rowIndex], _this.props.keys.groupIdKey);
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
            return child.type.secretKey === TimelineHeaders_1.default.secretKey;
        };
        _this.renderHeaders = function () {
            if (_this.props.children) {
                var headerRenderer_1;
                react_1.default.Children.map(_this.props.children, function (child) {
                    if (_this.isTimelineHeader(child)) {
                        headerRenderer_1 = child;
                    }
                });
                if (headerRenderer_1) {
                    return headerRenderer_1;
                }
            }
            return ((0, jsx_runtime_1.jsxs)(TimelineHeaders_1.default, { children: [(0, jsx_runtime_1.jsx)(DateHeader_1.default, { unit: "primaryHeader" }, void 0), (0, jsx_runtime_1.jsx)(DateHeader_1.default, {}, void 0)] }, void 0));
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
            visibleTimeStart = (0, date_fns_1.getTime)(_this.props.defaultTimeStart);
            visibleTimeEnd = (0, date_fns_1.getTime)(_this.props.defaultTimeEnd);
        }
        else if (_this.props.visibleTimeStart && _this.props.visibleTimeEnd) {
            visibleTimeStart = _this.props.visibleTimeStart;
            visibleTimeEnd = _this.props.visibleTimeEnd;
        }
        else {
            //throwing an error because neither default or visible time props provided
            throw new Error('You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline');
        }
        var _a = (0, calendar_1.getCanvasBoundariesFromVisibleTime)(visibleTimeStart, visibleTimeEnd, props.buffer), canvasTimeStart = _a[0], canvasTimeEnd = _a[1];
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
        var canvasWidth = (0, calendar_1.getCanvasWidth)(_this.state.width, props.buffer);
        var _b = (0, calendar_1.stackTimelineItems)(props.items, props.groups, canvasWidth, _this.state.canvasTimeStart, _this.state.canvasTimeEnd, props.keys, props.lineHeight, props.itemHeightRatio, props.stackItems, _this.state.draggingItem, _this.state.resizingItem, _this.state.dragTime, _this.state.resizingEdge, _this.state.resizeTime, _this.state.newGroupOrder), dimensionItems = _b.dimensionItems, height = _b.height, groupHeights = _b.groupHeights, groupTops = _b.groupTops;
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
        window_1.default.addListener(this);
        this.lastTouchDistance = null;
    };
    ReactCalendarTimeline.prototype.componentWillUnmount = function () {
        if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
            this.props.resizeDetector.removeListener(this);
        }
        window_1.default.removeListener(this);
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
            Object.assign(derivedState, (0, calendar_1.calculateScrollCanvas)(visibleTimeStart, visibleTimeEnd, forceUpdate, items, groups, nextProps, prevState));
        }
        else if (forceUpdate) {
            // Calculate new item stack position as canvas may have changed
            var canvasWidth = (0, calendar_1.getCanvasWidth)(prevState.width, nextProps.buffer);
            Object.assign(derivedState, (0, calendar_1.stackTimelineItems)(items, groups, canvasWidth, prevState.canvasTimeStart, prevState.canvasTimeEnd, nextProps.keys, nextProps.lineHeight, nextProps.itemHeightRatio, nextProps.stackItems, prevState.draggingItem, prevState.resizingItem, prevState.dragTime, prevState.resizingEdge, prevState.resizeTime, prevState.newGroupOrder));
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
        return ((0, jsx_runtime_1.jsx)(Columns_1.default, { canvasTimeStart: canvasTimeStart, canvasTimeEnd: canvasTimeEnd, canvasWidth: canvasWidth, lineCount: (0, generic_1._length)(this.props.groups), minUnit: minUnit, timeSteps: timeSteps, height: height, verticalLineClassNamesForTime: this.props.verticalLineClassNamesForTime, timeZone: this.props.timeZone }, void 0));
    };
    ReactCalendarTimeline.prototype.rows = function (canvasWidth, groupHeights, groups) {
        return ((0, jsx_runtime_1.jsx)(GroupRows_1.default, { groups: groups, canvasWidth: canvasWidth, lineCount: (0, generic_1._length)(this.props.groups), groupHeights: groupHeights, clickTolerance: this.props.clickTolerance, onRowClick: this.handleRowClick, onRowDoubleClick: this.handleRowDoubleClick, horizontalLineClassNamesForGroup: this.props.horizontalLineClassNamesForGroup, onRowContextClick: this.handleScrollContextMenu }, void 0));
    };
    ReactCalendarTimeline.prototype.items = function (canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops) {
        return ((0, jsx_runtime_1.jsx)(Items_1.default, { canvasTimeStart: canvasTimeStart, canvasTimeEnd: canvasTimeEnd, canvasWidth: canvasWidth, dimensionItems: dimensionItems, groupTops: groupTops, items: this.props.items, groups: this.props.groups, keys: this.props.keys, selectedItem: this.state.selectedItem, dragSnap: this.props.dragSnap, minResizeWidth: this.props.minResizeWidth, canChangeGroup: this.props.canChangeGroup, canMove: this.props.canMove, canResize: this.props.canResize, useResizeHandle: this.props.useResizeHandle, canSelect: this.props.canSelect, moveResizeValidator: this.props.moveResizeValidator, itemSelect: this.selectItem, itemDrag: this.dragItem, itemDrop: this.dropItem, onItemDoubleClick: this.doubleClickItem, onItemContextMenu: this.props.onItemContextMenu ? this.contextMenuClickItem : undefined, itemResizing: this.resizingItem, itemResized: this.resizedItem, itemRenderer: this.props.itemRenderer, selected: this.props.selected, scrollRef: this.scrollComponent }, void 0));
    };
    ReactCalendarTimeline.prototype.sidebar = function (height, groupHeights) {
        var sidebarWidth = this.props.sidebarWidth;
        return (sidebarWidth && ((0, jsx_runtime_1.jsx)(Sidebar_1.default, { groups: this.props.groups, groupRenderer: this.props.groupRenderer, keys: this.props.keys, width: sidebarWidth, groupHeights: groupHeights, height: height }, void 0)));
    };
    ReactCalendarTimeline.prototype.rightSidebar = function (height, groupHeights) {
        var rightSidebarWidth = this.props.rightSidebarWidth;
        return (rightSidebarWidth && ((0, jsx_runtime_1.jsx)(Sidebar_1.default, { groups: this.props.groups, keys: this.props.keys, groupRenderer: this.props.groupRenderer, isRightSidebar: true, width: rightSidebarWidth, groupHeights: groupHeights, height: height }, void 0)));
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
            timeSteps: timeSteps,
        };
        return react_1.default.Children.map(childArray, function (child) {
            if (!_this.isTimelineHeader(child)) {
                return react_1.default.cloneElement(child, childProps);
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
        var canvasWidth = (0, calendar_1.getCanvasWidth)(width, buffer);
        var minUnit = (0, calendar_1.getMinUnit)(zoom, width, timeSteps);
        var isInteractingWithItem = !!draggingItem || !!resizingItem;
        if (isInteractingWithItem) {
            var stackResults = (0, calendar_1.stackTimelineItems)(items, groups, canvasWidth, this.state.canvasTimeStart, this.state.canvasTimeEnd, this.props.keys, this.props.lineHeight, this.props.itemHeightRatio, this.props.stackItems, this.state.draggingItem, this.state.resizingItem, this.state.dragTime, this.state.resizingEdge, this.state.resizeTime, this.state.newGroupOrder);
            dimensionItems = stackResults.dimensionItems;
            height = stackResults.height;
            groupHeights = stackResults.groupHeights;
            groupTops = stackResults.groupTops;
        }
        var outerComponentStyle = {
            height: height + "px"
        };
        return ((0, jsx_runtime_1.jsx)(TimelineStateContext_1.TimelineStateProvider, __assign({ visibleTimeStart: visibleTimeStart, visibleTimeEnd: visibleTimeEnd, canvasTimeStart: canvasTimeStart, canvasTimeEnd: canvasTimeEnd, canvasWidth: canvasWidth, showPeriod: this.showPeriod, timelineUnit: minUnit, timelineWidth: this.state.width, timeZone: this.props.timeZone }, { children: (0, jsx_runtime_1.jsx)(TimelineMarkersContext_1.TimelineMarkersProvider, { children: (0, jsx_runtime_1.jsx)(HeadersContext_1.TimelineHeadersProvider, __assign({ registerScroll: this.handleHeaderRef, timeSteps: timeSteps, leftSidebarWidth: this.props.sidebarWidth, rightSidebarWidth: this.props.rightSidebarWidth, timeZone: this.props.timeZone }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ style: this.props.style, ref: function (el) { return (_this.container = el); }, className: "react-calendar-timeline " + this.props.className }, { children: [this.renderHeaders(), (0, jsx_runtime_1.jsxs)("div", __assign({ style: outerComponentStyle, className: "rct-outer" }, { children: [sidebarWidth > 0 ? this.sidebar(height, groupHeights) : null, (0, jsx_runtime_1.jsx)(ScrollElement_1.default, __assign({ scrollRef: this.getScrollElementRef, width: width, height: height, onZoom: this.changeZoom, onWheelZoom: this.handleWheelZoom, traditionalZoom: traditionalZoom, onScroll: this.onScroll, isInteractingWithItem: isInteractingWithItem }, { children: (0, jsx_runtime_1.jsxs)(MarkerCanvas_1.default, { children: [this.columns(canvasTimeStart, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height), this.rows(canvasWidth, groupHeights, groups), this.items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops), this.childrenWithProps(canvasTimeStart, canvasTimeEnd, canvasWidth, dimensionItems, groupHeights, groupTops, height, visibleTimeStart, visibleTimeEnd, minUnit, timeSteps)] }, void 0) }), void 0), rightSidebarWidth > 0
                                        ? this.rightSidebar(height, groupHeights)
                                        : null] }), void 0)] }), void 0) }), void 0) }, void 0) }), void 0));
    };
    ReactCalendarTimeline.propTypes = {
        groups: prop_types_1.default.oneOfType([prop_types_1.default.array, prop_types_1.default.object]).isRequired,
        items: prop_types_1.default.oneOfType([prop_types_1.default.array, prop_types_1.default.object]).isRequired,
        sidebarWidth: prop_types_1.default.number,
        rightSidebarWidth: prop_types_1.default.number,
        dragSnap: prop_types_1.default.number,
        timeZone: prop_types_1.default.string,
        minResizeWidth: prop_types_1.default.number,
        lineHeight: prop_types_1.default.number,
        itemHeightRatio: prop_types_1.default.number,
        minZoom: prop_types_1.default.number,
        maxZoom: prop_types_1.default.number,
        buffer: prop_types_1.default.number,
        clickTolerance: prop_types_1.default.number,
        canChangeGroup: prop_types_1.default.bool,
        canMove: prop_types_1.default.bool,
        canResize: prop_types_1.default.oneOf([true, false, 'left', 'right', 'both']),
        useResizeHandle: prop_types_1.default.bool,
        canSelect: prop_types_1.default.bool,
        stackItems: prop_types_1.default.bool,
        traditionalZoom: prop_types_1.default.bool,
        itemTouchSendsClick: prop_types_1.default.bool,
        horizontalLineClassNamesForGroup: prop_types_1.default.func,
        onItemMove: prop_types_1.default.func,
        onItemResize: prop_types_1.default.func,
        onItemClick: prop_types_1.default.func,
        onItemSelect: prop_types_1.default.func,
        onItemDeselect: prop_types_1.default.func,
        onCanvasClick: prop_types_1.default.func,
        onItemDoubleClick: prop_types_1.default.func,
        onItemContextMenu: prop_types_1.default.func,
        onCanvasDoubleClick: prop_types_1.default.func,
        onCanvasContextMenu: prop_types_1.default.func,
        onZoom: prop_types_1.default.func,
        onItemDrag: prop_types_1.default.func,
        moveResizeValidator: prop_types_1.default.func,
        itemRenderer: prop_types_1.default.func,
        groupRenderer: prop_types_1.default.func,
        className: prop_types_1.default.string,
        style: prop_types_1.default.object,
        keys: prop_types_1.default.shape({
            groupIdKey: prop_types_1.default.string,
            groupTitleKey: prop_types_1.default.string,
            groupLabelKey: prop_types_1.default.string,
            groupRightTitleKey: prop_types_1.default.string,
            itemIdKey: prop_types_1.default.string,
            itemTitleKey: prop_types_1.default.string,
            itemDivTitleKey: prop_types_1.default.string,
            itemGroupKey: prop_types_1.default.string,
            itemTimeStartKey: prop_types_1.default.string,
            itemTimeEndKey: prop_types_1.default.string
        }),
        headerRef: prop_types_1.default.func,
        scrollRef: prop_types_1.default.func,
        timeSteps: prop_types_1.default.shape({
            second: prop_types_1.default.number,
            minute: prop_types_1.default.number,
            hour: prop_types_1.default.number,
            day: prop_types_1.default.number,
            month: prop_types_1.default.number,
            year: prop_types_1.default.number
        }),
        defaultTimeStart: prop_types_1.default.object,
        defaultTimeEnd: prop_types_1.default.object,
        visibleTimeStart: prop_types_1.default.number,
        visibleTimeEnd: prop_types_1.default.number,
        onTimeChange: prop_types_1.default.func,
        onBoundsChange: prop_types_1.default.func,
        selected: prop_types_1.default.array,
        headerLabelFormats: prop_types_1.default.shape({
            yearShort: prop_types_1.default.string,
            yearLong: prop_types_1.default.string,
            monthShort: prop_types_1.default.string,
            monthMedium: prop_types_1.default.string,
            monthMediumLong: prop_types_1.default.string,
            monthLong: prop_types_1.default.string,
            dayShort: prop_types_1.default.string,
            dayLong: prop_types_1.default.string,
            hourShort: prop_types_1.default.string,
            hourMedium: prop_types_1.default.string,
            hourMediumLong: prop_types_1.default.string,
            hourLong: prop_types_1.default.string
        }),
        subHeaderLabelFormats: prop_types_1.default.shape({
            yearShort: prop_types_1.default.string,
            yearLong: prop_types_1.default.string,
            monthShort: prop_types_1.default.string,
            monthMedium: prop_types_1.default.string,
            monthLong: prop_types_1.default.string,
            dayShort: prop_types_1.default.string,
            dayMedium: prop_types_1.default.string,
            dayMediumLong: prop_types_1.default.string,
            dayLong: prop_types_1.default.string,
            hourShort: prop_types_1.default.string,
            hourLong: prop_types_1.default.string,
            minuteShort: prop_types_1.default.string,
            minuteLong: prop_types_1.default.string
        }),
        resizeDetector: prop_types_1.default.shape({
            addListener: prop_types_1.default.func,
            removeListener: prop_types_1.default.func
        }),
        verticalLineClassNamesForTime: prop_types_1.default.func,
        children: prop_types_1.default.node
    };
    ReactCalendarTimeline.defaultProps = {
        sidebarWidth: 150,
        rightSidebarWidth: 0,
        dragSnap: 1000 * 60 * 15,
        minResizeWidth: 20,
        lineHeight: 30,
        itemHeightRatio: 0.65,
        buffer: 3,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
        keys: default_config_1.defaultKeys,
        timeSteps: default_config_1.defaultTimeSteps,
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
        headerLabelFormats: default_config_1.defaultHeaderLabelFormats,
        subHeaderLabelFormats: default_config_1.defaultSubHeaderLabelFormats,
        selected: null
    };
    ReactCalendarTimeline.childContextTypes = {
        getTimelineContext: prop_types_1.default.func
    };
    return ReactCalendarTimeline;
}(react_1.Component));
exports.default = ReactCalendarTimeline;
