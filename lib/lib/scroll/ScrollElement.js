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
import { getParentPosition } from '../utility/dom-helpers';
var ScrollElement = /** @class */ (function (_super) {
    __extends(ScrollElement, _super);
    function ScrollElement() {
        var _this = _super.call(this) || this;
        /**
         * needed to handle scrolling with trackpad
         */
        _this.handleScroll = function () {
            var scrollX = _this.scrollComponent.scrollLeft;
            _this.props.onScroll(scrollX);
        };
        _this.refHandler = function (el) {
            _this.scrollComponent = el;
            _this.props.scrollRef(el);
            if (el) {
                el.addEventListener('wheel', _this.handleWheel, { passive: false });
            }
        };
        _this.handleWheel = function (e) {
            var traditionalZoom = _this.props.traditionalZoom;
            // zoom in the time dimension
            if (e.ctrlKey || e.metaKey || e.altKey) {
                e.preventDefault();
                var parentPosition = getParentPosition(e.currentTarget);
                var xPosition = e.clientX - parentPosition.x;
                var speed = e.ctrlKey ? 10 : e.metaKey ? 3 : 1;
                // convert vertical zoom to horiziontal
                _this.props.onWheelZoom(speed, xPosition, e.deltaY);
            }
            else if (e.shiftKey) {
                e.preventDefault();
                // shift+scroll event from a touchpad has deltaY property populated; shift+scroll event from a mouse has deltaX
                _this.props.onScroll(_this.scrollComponent.scrollLeft + (e.deltaY || e.deltaX));
                // no modifier pressed? we prevented the default event, so scroll or zoom as needed
            }
        };
        _this.handleMouseDown = function (e) {
            if (e.button === 0) {
                _this.dragStartPosition = e.pageX;
                _this.dragLastPosition = e.pageX;
                _this.setState({
                    isDragging: true
                });
            }
        };
        _this.handleMouseMove = function (e) {
            // this.props.onMouseMove(e)
            //why is interacting with item important?
            if (_this.state.isDragging && !_this.props.isInteractingWithItem) {
                _this.props.onScroll(_this.scrollComponent.scrollLeft + _this.dragLastPosition - e.pageX);
                _this.dragLastPosition = e.pageX;
            }
        };
        _this.handleMouseUp = function () {
            _this.dragStartPosition = null;
            _this.dragLastPosition = null;
            _this.setState({
                isDragging: false
            });
        };
        _this.handleMouseLeave = function () {
            // this.props.onMouseLeave(e)
            _this.dragStartPosition = null;
            _this.dragLastPosition = null;
            _this.setState({
                isDragging: false
            });
        };
        _this.handleTouchStart = function (e) {
            if (e.touches.length === 2) {
                e.preventDefault();
                _this.lastTouchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);
                _this.singleTouchStart = null;
                _this.lastSingleTouch = null;
            }
            else if (e.touches.length === 1) {
                e.preventDefault();
                var x = e.touches[0].clientX;
                var y = e.touches[0].clientY;
                _this.lastTouchDistance = null;
                _this.singleTouchStart = { x: x, y: y, screenY: window.pageYOffset };
                _this.lastSingleTouch = { x: x, y: y, screenY: window.pageYOffset };
            }
        };
        _this.handleTouchMove = function (e) {
            var _a = _this.props, isInteractingWithItem = _a.isInteractingWithItem, width = _a.width, onZoom = _a.onZoom;
            if (isInteractingWithItem) {
                e.preventDefault();
                return;
            }
            if (_this.lastTouchDistance && e.touches.length === 2) {
                e.preventDefault();
                var touchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);
                var parentPosition = getParentPosition(e.currentTarget);
                var xPosition = (e.touches[0].screenX + e.touches[1].screenX) / 2 - parentPosition.x;
                if (touchDistance !== 0 && _this.lastTouchDistance !== 0) {
                    onZoom(_this.lastTouchDistance / touchDistance, xPosition / width);
                    _this.lastTouchDistance = touchDistance;
                }
            }
            else if (_this.lastSingleTouch && e.touches.length === 1) {
                e.preventDefault();
                var x = e.touches[0].clientX;
                var y = e.touches[0].clientY;
                var deltaX = x - _this.lastSingleTouch.x;
                var deltaX0 = x - _this.singleTouchStart.x;
                var deltaY0 = y - _this.singleTouchStart.y;
                _this.lastSingleTouch = { x: x, y: y };
                var moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0);
                var moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0);
                if (deltaX !== 0 && moveX) {
                    _this.props.onScroll(_this.scrollComponent.scrollLeft - deltaX);
                }
                if (moveY) {
                    window.scrollTo(window.pageXOffset, _this.singleTouchStart.screenY - deltaY0);
                }
            }
        };
        _this.handleTouchEnd = function () {
            if (_this.lastTouchDistance) {
                _this.lastTouchDistance = null;
            }
            if (_this.lastSingleTouch) {
                _this.lastSingleTouch = null;
                _this.singleTouchStart = null;
            }
        };
        _this.state = {
            isDragging: false
        };
        return _this;
    }
    ScrollElement.prototype.componentWillUnmount = function () {
        if (this.scrollComponent) {
            this.scrollComponent.removeEventListener('wheel', this.handleWheel);
        }
    };
    ScrollElement.prototype.render = function () {
        var _a = this.props, width = _a.width, height = _a.height, children = _a.children;
        var isDragging = this.state.isDragging;
        var scrollComponentStyle = {
            width: width + "px",
            height: height + 20 + "px",
            cursor: isDragging ? 'move' : 'default',
            position: 'relative'
        };
        return (_jsx("div", __assign({ ref: this.refHandler, "data-testid": "scroll-element", className: "rct-scroll", style: scrollComponentStyle, onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp, onMouseLeave: this.handleMouseLeave, onTouchStart: this.handleTouchStart, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd, onScroll: this.handleScroll }, { children: children }), void 0));
    };
    ScrollElement.propTypes = {
        children: PropTypes.element.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        traditionalZoom: PropTypes.bool.isRequired,
        scrollRef: PropTypes.func.isRequired,
        isInteractingWithItem: PropTypes.bool.isRequired,
        onZoom: PropTypes.func.isRequired,
        onWheelZoom: PropTypes.func.isRequired,
        onScroll: PropTypes.func.isRequired
    };
    return ScrollElement;
}(Component));
export default ScrollElement;
