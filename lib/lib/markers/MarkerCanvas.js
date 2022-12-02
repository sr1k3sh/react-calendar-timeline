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
import React from 'react';
import PropTypes from 'prop-types';
import { MarkerCanvasProvider } from './MarkerCanvasContext';
import TimelineMarkersRenderer from './TimelineMarkersRenderer';
import { TimelineStateConsumer } from '../timeline/TimelineStateContext';
// expand to fill entire parent container (ScrollElement)
var staticStyles = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
};
/**
 * Renders registered markers and exposes a mouse over listener for
 * CursorMarkers to subscribe to
 */
var MarkerCanvas = /** @class */ (function (_super) {
    __extends(MarkerCanvas, _super);
    function MarkerCanvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleMouseMove = function (evt) {
            if (_this.subscription != null) {
                var pageX = evt.pageX;
                // FIXME: dont use getBoundingClientRect. Use passed in scroll amount
                var containerLeft = _this.containerEl.getBoundingClientRect().left;
                // number of pixels from left we are on canvas
                // we do this calculation as pageX is based on x from viewport whereas
                // our canvas can be scrolled left and right and is generally outside
                // of the viewport.  This calculation is to get how many pixels the cursor
                // is from left of this element
                var canvasX = pageX - containerLeft;
                var date = _this.props.getDateFromLeftOffsetPosition(canvasX);
                _this.subscription({
                    leftOffset: canvasX,
                    date: date,
                    isCursorOverCanvas: true
                });
            }
        };
        _this.handleMouseLeave = function () {
            if (_this.subscription != null) {
                // tell subscriber that we're not on canvas
                _this.subscription({ leftOffset: 0, date: 0, isCursorOverCanvas: false });
            }
        };
        _this.handleMouseMoveSubscribe = function (sub) {
            _this.subscription = sub;
            return function () {
                _this.subscription = null;
            };
        };
        _this.state = {
            subscribeToMouseOver: _this.handleMouseMoveSubscribe
        };
        return _this;
    }
    MarkerCanvas.prototype.render = function () {
        var _this = this;
        return (_jsx(MarkerCanvasProvider, __assign({ value: this.state }, { children: _jsxs("div", __assign({ style: staticStyles, onMouseMove: this.handleMouseMove, onMouseLeave: this.handleMouseLeave, ref: function (el) { return (_this.containerEl = el); } }, { children: [_jsx(TimelineMarkersRenderer, {}, void 0), this.props.children] }), void 0) }), void 0));
    };
    MarkerCanvas.propTypes = {
        getDateFromLeftOffsetPosition: PropTypes.func.isRequired,
        children: PropTypes.node
    };
    return MarkerCanvas;
}(React.Component));
var MarkerCanvasWrapper = function (props) { return (_jsx(TimelineStateConsumer, { children: function (_a) {
        var getDateFromLeftOffsetPosition = _a.getDateFromLeftOffsetPosition;
        return (_jsx(MarkerCanvas, __assign({ getDateFromLeftOffsetPosition: getDateFromLeftOffsetPosition }, props), void 0));
    } }, void 0)); };
export default MarkerCanvasWrapper;
