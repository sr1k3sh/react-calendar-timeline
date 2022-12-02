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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import interact from 'interactjs';
import { _get, deepObjectCompare } from '../utility/generic';
import { composeEvents } from '../utility/events';
import { defaultItemRenderer } from './defaultItemRenderer';
import { coordinateToTimeRatio } from '../utility/calendar';
import { getSumScroll, getSumOffset } from '../utility/dom-helpers';
import { overridableStyles, selectedStyle, selectedAndCanMove, selectedAndCanResizeLeft, selectedAndCanResizeLeftAndDragLeft, selectedAndCanResizeRight, selectedAndCanResizeRightAndDragRight, leftResizeStyle, rightResizeStyle } from './styles';
function getSetOffset(date) {
    return date
        ? -Math.round(date.getTimezoneOffset() / 15) * 15
        : NaN;
}
export var ItemContext = React.createContext({
    getTimelineContext: function () { },
});
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(props) {
        var _this = _super.call(this, props) || this;
        _this.onMouseDown = function (e) {
            if (!_this.state.interactMounted) {
                e.preventDefault();
                _this.startedClicking = true;
            }
        };
        _this.onMouseUp = function (e) {
            if (!_this.state.interactMounted && _this.startedClicking) {
                _this.startedClicking = false;
                _this.actualClick(e, 'click');
            }
        };
        _this.onTouchStart = function (e) {
            if (!_this.state.interactMounted) {
                e.preventDefault();
                _this.startedTouching = true;
            }
        };
        _this.onTouchEnd = function (e) {
            if (!_this.state.interactMounted && _this.startedTouching) {
                _this.startedTouching = false;
                _this.actualClick(e, 'touch');
            }
        };
        _this.handleDoubleClick = function (e) {
            e.stopPropagation();
            if (_this.props.onItemDoubleClick) {
                _this.props.onItemDoubleClick(_this.itemId, e);
            }
        };
        _this.handleContextMenu = function (e) {
            if (_this.props.onContextMenu) {
                e.preventDefault();
                e.stopPropagation();
                _this.props.onContextMenu(_this.itemId, e);
            }
        };
        _this.getItemRef = function (el) { return (_this.item = el); };
        _this.getDragLeftRef = function (el) { return (_this.dragLeft = el); };
        _this.getDragRightRef = function (el) { return (_this.dragRight = el); };
        _this.getItemProps = function (props) {
            if (props === void 0) { props = {}; }
            //TODO: maybe shouldnt include all of these classes
            var classNames = 'rct-item' +
                (_this.props.item.className ? " " + _this.props.item.className : '');
            return {
                key: _this.itemId,
                ref: _this.getItemRef,
                title: _this.itemDivTitle,
                className: classNames + (" " + (props.className ? props.className : '')),
                onMouseDown: composeEvents(_this.onMouseDown, props.onMouseDown),
                onMouseUp: composeEvents(_this.onMouseUp, props.onMouseUp),
                onTouchStart: composeEvents(_this.onTouchStart, props.onTouchStart),
                onTouchEnd: composeEvents(_this.onTouchEnd, props.onTouchEnd),
                onDoubleClick: composeEvents(_this.handleDoubleClick, props.onDoubleClick),
                onContextMenu: composeEvents(_this.handleContextMenu, props.onContextMenu),
                style: Object.assign({}, _this.getItemStyle(props))
            };
        };
        _this.getResizeProps = function (props) {
            if (props === void 0) { props = {}; }
            var leftName = "rct-item-handler rct-item-handler-left rct-item-handler-resize-left";
            if (props.leftClassName) {
                leftName += " " + props.leftClassName;
            }
            var rightName = "rct-item-handler rct-item-handler-right rct-item-handler-resize-right";
            if (props.rightClassName) {
                rightName += " " + props.rightClassName;
            }
            return {
                left: {
                    ref: _this.getDragLeftRef,
                    className: leftName,
                    style: Object.assign({}, leftResizeStyle, props.leftStyle)
                },
                right: {
                    ref: _this.getDragRightRef,
                    className: rightName,
                    style: Object.assign({}, rightResizeStyle, props.rightStyle)
                }
            };
        };
        _this.cacheDataFromProps(props);
        _this.state = {
            interactMounted: false,
            dragging: null,
            dragStart: null,
            preDragPosition: null,
            dragTime: null,
            dragGroupDelta: null,
            resizing: null,
            resizeEdge: null,
            resizeStart: null,
            resizeTime: null
        };
        return _this;
    }
    Item.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var shouldUpdate = nextState.dragging !== this.state.dragging ||
            nextState.dragTime !== this.state.dragTime ||
            nextState.dragGroupDelta !== this.state.dragGroupDelta ||
            nextState.resizing !== this.state.resizing ||
            nextState.resizeTime !== this.state.resizeTime ||
            nextProps.keys !== this.props.keys ||
            !deepObjectCompare(nextProps.itemProps, this.props.itemProps) ||
            nextProps.selected !== this.props.selected ||
            nextProps.item !== this.props.item ||
            nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
            nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
            nextProps.canvasWidth !== this.props.canvasWidth ||
            (nextProps.order ? nextProps.order.index : undefined) !==
                (this.props.order ? this.props.order.index : undefined) ||
            nextProps.dragSnap !== this.props.dragSnap ||
            nextProps.minResizeWidth !== this.props.minResizeWidth ||
            nextProps.canChangeGroup !== this.props.canChangeGroup ||
            nextProps.canSelect !== this.props.canSelect ||
            nextProps.canMove !== this.props.canMove ||
            nextProps.canResizeLeft !== this.props.canResizeLeft ||
            nextProps.canResizeRight !== this.props.canResizeRight ||
            nextProps.dimensions !== this.props.dimensions;
        return shouldUpdate;
    };
    Item.prototype.cacheDataFromProps = function (props) {
        this.itemId = _get(props.item, props.keys.itemIdKey);
        this.itemTitle = _get(props.item, props.keys.itemTitleKey);
        this.itemDivTitle = props.keys.itemDivTitleKey
            ? _get(props.item, props.keys.itemDivTitleKey)
            : this.itemTitle;
        this.itemTimeStart = _get(props.item, props.keys.itemTimeStartKey);
        this.itemTimeEnd = _get(props.item, props.keys.itemTimeEndKey);
    };
    Item.prototype.getTimeRatio = function () {
        var _a = this.props, canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd, canvasWidth = _a.canvasWidth;
        return coordinateToTimeRatio(canvasTimeStart, canvasTimeEnd, canvasWidth);
    };
    Item.prototype.dragTimeSnap = function (dragTime, considerOffset) {
        var dragSnap = this.props.dragSnap;
        if (dragSnap) {
            var offset = considerOffset ? getSetOffset(new Date()) * 60 * 1000 : 0;
            return Math.round(dragTime / dragSnap) * dragSnap - offset % dragSnap;
        }
        else {
            return dragTime;
        }
    };
    Item.prototype.resizeTimeSnap = function (dragTime) {
        var dragSnap = this.props.dragSnap;
        if (dragSnap) {
            var endTime = this.itemTimeEnd % dragSnap;
            return Math.round((dragTime - endTime) / dragSnap) * dragSnap + endTime;
        }
        else {
            return dragTime;
        }
    };
    Item.prototype.dragTime = function (e) {
        var startTime = new Date(this.itemTimeStart);
        if (this.state.dragging) {
            return this.dragTimeSnap(this.timeFor(e) + this.state.dragStart.offset, true);
        }
        else {
            return startTime;
        }
    };
    Item.prototype.timeFor = function (e) {
        var ratio = coordinateToTimeRatio(this.props.canvasTimeStart, this.props.canvasTimeEnd, this.props.canvasWidth);
        var offset = getSumOffset(this.props.scrollRef).offsetLeft;
        var scrolls = getSumScroll(this.props.scrollRef);
        return (e.pageX - offset + scrolls.scrollLeft) * ratio + this.props.canvasTimeStart;
    };
    Item.prototype.dragGroupDelta = function (e) {
        var _a = this.props, groupTops = _a.groupTops, order = _a.order;
        if (this.state.dragging) {
            if (!this.props.canChangeGroup) {
                return 0;
            }
            var groupDelta = 0;
            var offset = getSumOffset(this.props.scrollRef).offsetTop;
            var scrolls = getSumScroll(this.props.scrollRef);
            for (var _i = 0, _b = Object.keys(groupTops); _i < _b.length; _i++) {
                var key = _b[_i];
                var groupTop = groupTops[key];
                if (e.pageY - offset + scrolls.scrollTop > groupTop) {
                    groupDelta = parseInt(key, 10) - order.index;
                }
                else {
                    break;
                }
            }
            if (this.props.order.index + groupDelta < 0) {
                return 0 - this.props.order.index;
            }
            else {
                return groupDelta;
            }
        }
        else {
            return 0;
        }
    };
    Item.prototype.resizeTimeDelta = function (e, resizeEdge) {
        var length = this.itemTimeEnd - this.itemTimeStart;
        var timeDelta = this.dragTimeSnap((e.pageX - this.state.resizeStart) * this.getTimeRatio());
        if (length + (resizeEdge === 'left' ? -timeDelta : timeDelta) <
            (this.props.dragSnap || 1000)) {
            if (resizeEdge === 'left') {
                return length - (this.props.dragSnap || 1000);
            }
            else {
                return (this.props.dragSnap || 1000) - length;
            }
        }
        else {
            return timeDelta;
        }
    };
    Item.prototype.mountInteract = function () {
        var _this = this;
        var leftResize = this.props.useResizeHandle ? ".rct-item-handler-resize-left" : true;
        var rightResize = this.props.useResizeHandle ? ".rct-item-handler-resize-right" : true;
        interact(this.item)
            .resizable({
            edges: {
                left: this.canResizeLeft() && leftResize,
                right: this.canResizeRight() && rightResize,
                top: false,
                bottom: false
            },
            enabled: this.props.selected && (this.canResizeLeft() || this.canResizeRight())
        })
            .draggable({
            enabled: this.props.selected && this.canMove()
        })
            .styleCursor(false)
            .on('dragstart', function (e) {
            if (_this.props.selected) {
                var clickTime = _this.timeFor(e);
                _this.setState({
                    dragging: true,
                    dragStart: {
                        x: e.pageX,
                        y: e.pageY,
                        offset: _this.itemTimeStart - clickTime
                    },
                    preDragPosition: { x: e.target.offsetLeft, y: e.target.offsetTop },
                    dragTime: _this.itemTimeStart,
                    dragGroupDelta: 0
                });
            }
            else {
                return false;
            }
        })
            .on('dragmove', function (e) {
            if (_this.state.dragging) {
                var dragTime = _this.dragTime(e);
                var dragGroupDelta = _this.dragGroupDelta(e);
                if (_this.props.moveResizeValidator) {
                    dragTime = _this.props.moveResizeValidator('move', _this.props.item, dragTime);
                }
                if (_this.props.onDrag) {
                    _this.props.onDrag(_this.itemId, dragTime, _this.props.order.index + dragGroupDelta);
                }
                _this.setState({
                    dragTime: dragTime,
                    dragGroupDelta: dragGroupDelta
                });
            }
        })
            .on('dragend', function (e) {
            if (_this.state.dragging) {
                if (_this.props.onDrop) {
                    var dragTime = _this.dragTime(e);
                    if (_this.props.moveResizeValidator) {
                        dragTime = _this.props.moveResizeValidator('move', _this.props.item, dragTime);
                    }
                    _this.props.onDrop(_this.itemId, dragTime, _this.props.order.index + _this.dragGroupDelta(e));
                }
                _this.setState({
                    dragging: false,
                    dragStart: null,
                    preDragPosition: null,
                    dragTime: null,
                    dragGroupDelta: null
                });
            }
        })
            .on('resizestart', function (e) {
            if (_this.props.selected) {
                _this.setState({
                    resizing: true,
                    resizeEdge: null,
                    resizeStart: e.pageX,
                    resizeTime: 0
                });
            }
            else {
                return false;
            }
        })
            .on('resizemove', function (e) {
            if (_this.state.resizing) {
                var resizeEdge = _this.state.resizeEdge;
                if (!resizeEdge) {
                    resizeEdge = e.deltaRect.left !== 0 ? 'left' : 'right';
                    _this.setState({ resizeEdge: resizeEdge });
                }
                var resizeTime = _this.resizeTimeSnap(_this.timeFor(e));
                if (_this.props.moveResizeValidator) {
                    resizeTime = _this.props.moveResizeValidator('resize', _this.props.item, resizeTime, resizeEdge);
                }
                if (_this.props.onResizing) {
                    _this.props.onResizing(_this.itemId, resizeTime, resizeEdge);
                }
                _this.setState({
                    resizeTime: resizeTime
                });
            }
        })
            .on('resizeend', function (e) {
            if (_this.state.resizing) {
                var resizeEdge = _this.state.resizeEdge;
                var resizeTime = _this.resizeTimeSnap(_this.timeFor(e));
                if (_this.props.moveResizeValidator) {
                    resizeTime = _this.props.moveResizeValidator('resize', _this.props.item, resizeTime, resizeEdge);
                }
                if (_this.props.onResized) {
                    _this.props.onResized(_this.itemId, resizeTime, resizeEdge, _this.resizeTimeDelta(e, resizeEdge));
                }
                _this.setState({
                    resizing: null,
                    resizeStart: null,
                    resizeEdge: null,
                    resizeTime: null
                });
            }
        })
            .on('tap', function (e) {
            _this.actualClick(e, e.pointerType === 'mouse' ? 'click' : 'touch');
        });
        this.setState({
            interactMounted: true
        });
    };
    Item.prototype.canResizeLeft = function (props) {
        if (props === void 0) { props = this.props; }
        if (!props.canResizeLeft) {
            return false;
        }
        var width = parseInt(props.dimensions.width, 10);
        return width >= props.minResizeWidth;
    };
    Item.prototype.canResizeRight = function (props) {
        if (props === void 0) { props = this.props; }
        if (!props.canResizeRight) {
            return false;
        }
        var width = parseInt(props.dimensions.width, 10);
        return width >= props.minResizeWidth;
    };
    Item.prototype.canMove = function (props) {
        if (props === void 0) { props = this.props; }
        return !!props.canMove;
    };
    Item.prototype.componentDidUpdate = function (prevProps) {
        this.cacheDataFromProps(this.props);
        var interactMounted = this.state.interactMounted;
        var couldDrag = prevProps.selected && this.canMove(prevProps);
        var couldResizeLeft = prevProps.selected && this.canResizeLeft(prevProps);
        var couldResizeRight = prevProps.selected && this.canResizeRight(prevProps);
        var willBeAbleToDrag = this.props.selected && this.canMove(this.props);
        var willBeAbleToResizeLeft = this.props.selected && this.canResizeLeft(this.props);
        var willBeAbleToResizeRight = this.props.selected && this.canResizeRight(this.props);
        if (!!this.item) {
            if (this.props.selected && !interactMounted) {
                this.mountInteract();
                interactMounted = true;
            }
            if (interactMounted &&
                (couldResizeLeft !== willBeAbleToResizeLeft ||
                    couldResizeRight !== willBeAbleToResizeRight)) {
                var leftResize = this.props.useResizeHandle ? this.dragLeft : true;
                var rightResize = this.props.useResizeHandle ? this.dragRight : true;
                interact(this.item).resizable({
                    enabled: willBeAbleToResizeLeft || willBeAbleToResizeRight,
                    edges: {
                        top: false,
                        bottom: false,
                        left: willBeAbleToResizeLeft && leftResize,
                        right: willBeAbleToResizeRight && rightResize
                    }
                });
            }
            if (interactMounted && couldDrag !== willBeAbleToDrag) {
                interact(this.item).draggable({ enabled: willBeAbleToDrag });
            }
        }
        else {
            interactMounted = false;
        }
        this.setState({
            interactMounted: interactMounted,
        });
    };
    Item.prototype.actualClick = function (e, clickType) {
        if (this.props.canSelect && this.props.onSelect) {
            this.props.onSelect(this.itemId, clickType, e);
        }
    };
    Item.prototype.getItemStyle = function (props) {
        var dimensions = this.props.dimensions;
        var baseStyles = {
            position: 'absolute',
            boxSizing: 'border-box',
            left: dimensions.left + "px",
            top: dimensions.top + "px",
            width: dimensions.width + "px",
            height: dimensions.height + "px",
            lineHeight: dimensions.height + "px"
        };
        var finalStyle = Object.assign({}, overridableStyles, this.props.selected ? selectedStyle : {}, this.props.selected & this.canMove(this.props) ? selectedAndCanMove : {}, this.props.selected & this.canResizeLeft(this.props)
            ? selectedAndCanResizeLeft
            : {}, this.props.selected & this.canResizeLeft(this.props) & this.state.dragging
            ? selectedAndCanResizeLeftAndDragLeft
            : {}, this.props.selected & this.canResizeRight(this.props)
            ? selectedAndCanResizeRight
            : {}, this.props.selected &
            this.canResizeRight(this.props) &
            this.state.dragging
            ? selectedAndCanResizeRightAndDragRight
            : {}, props.style, baseStyles);
        return finalStyle;
    };
    Item.prototype.render = function () {
        if (typeof this.props.order === 'undefined' || this.props.order === null) {
            return null;
        }
        var timelineContext = this.context.getTimelineContext();
        var itemContext = {
            dimensions: this.props.dimensions,
            useResizeHandle: this.props.useResizeHandle,
            title: this.itemTitle,
            canMove: this.canMove(this.props),
            canResizeLeft: this.canResizeLeft(this.props),
            canResizeRight: this.canResizeRight(this.props),
            selected: this.props.selected,
            dragging: this.state.dragging,
            dragStart: this.state.dragStart,
            dragTime: this.state.dragTime,
            dragGroupDelta: this.state.dragGroupDelta,
            resizing: this.state.resizing,
            resizeEdge: this.state.resizeEdge,
            resizeStart: this.state.resizeStart,
            resizeTime: this.state.resizeTime,
            width: this.props.dimensions.width
        };
        return this.props.itemRenderer({
            item: this.props.item,
            timelineContext: timelineContext,
            itemContext: itemContext,
            getItemProps: this.getItemProps,
            getResizeProps: this.getResizeProps
        });
    };
    // removed prop type check for SPEED!
    // they are coming from a trusted component anyway
    // (this complicates performance debugging otherwise)
    Item.propTypes = {
        canvasTimeStart: PropTypes.number.isRequired,
        canvasTimeEnd: PropTypes.number.isRequired,
        canvasWidth: PropTypes.number.isRequired,
        order: PropTypes.object,
        dragSnap: PropTypes.number,
        minResizeWidth: PropTypes.number,
        selected: PropTypes.bool,
        canChangeGroup: PropTypes.bool.isRequired,
        canMove: PropTypes.bool.isRequired,
        canResizeLeft: PropTypes.bool.isRequired,
        canResizeRight: PropTypes.bool.isRequired,
        keys: PropTypes.object.isRequired,
        item: PropTypes.object.isRequired,
        onSelect: PropTypes.func,
        onDrag: PropTypes.func,
        onDrop: PropTypes.func,
        onResizing: PropTypes.func,
        onResized: PropTypes.func,
        onContextMenu: PropTypes.func,
        itemRenderer: PropTypes.func,
        itemProps: PropTypes.object,
        canSelect: PropTypes.bool,
        dimensions: PropTypes.object,
        groupTops: PropTypes.array,
        useResizeHandle: PropTypes.bool,
        moveResizeValidator: PropTypes.func,
        onItemDoubleClick: PropTypes.func,
        scrollRef: PropTypes.object
    };
    Item.defaultProps = {
        selected: false,
        itemRenderer: defaultItemRenderer
    };
    Item.contextType = ItemContext;
    return Item;
}(Component));
export default Item;
