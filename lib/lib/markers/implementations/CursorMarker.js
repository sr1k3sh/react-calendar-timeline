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
import React from 'react';
import PropTypes from 'prop-types';
import { createMarkerStylesWithLeftOffset, createDefaultRenderer } from './shared';
import { MarkerCanvasConsumer } from '../MarkerCanvasContext';
var defaultRenderer = createDefaultRenderer('default-cursor-marker');
/**
 * CursorMarker implementation subscribes to 'subscribeToCanvasMouseOver' on mount.
 * This subscription is passed in via MarkerCanvasConsumer, which is wired up to
 * MarkerCanvasProvider in the MarkerCanvas component. When the user mouses over MarkerCanvas,
 * the callback registered in CursorMarker (this component) is passed:
 *  leftOffset - pixels from left edge of canvas, used to position this element
 *  date - the date the cursor pertains to
 *  isCursorOverCanvas - whether the user cursor is over the canvas. This is set to 'false'
 *  when the user mouseleaves the element
 */
var CursorMarker = /** @class */ (function (_super) {
    __extends(CursorMarker, _super);
    function CursorMarker() {
        var _this = _super.call(this) || this;
        _this.handleCanvasMouseOver = function (_a) {
            var leftOffset = _a.leftOffset, date = _a.date, isCursorOverCanvas = _a.isCursorOverCanvas;
            _this.setState({
                leftOffset: leftOffset,
                date: date,
                isShowingCursor: isCursorOverCanvas
            });
        };
        _this.state = {
            leftOffset: 0,
            date: 0,
            isShowingCursor: false
        };
        return _this;
    }
    CursorMarker.prototype.componentDidMount = function () {
        this.unsubscribe = this.props.subscribeToCanvasMouseOver(this.handleCanvasMouseOver);
    };
    CursorMarker.prototype.componentWillUnmount = function () {
        if (this.unsubscribe != null) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    };
    CursorMarker.prototype.render = function () {
        var _a = this.state, isShowingCursor = _a.isShowingCursor, leftOffset = _a.leftOffset, date = _a.date;
        if (!isShowingCursor)
            return null;
        var styles = createMarkerStylesWithLeftOffset(leftOffset);
        return this.props.renderer({ styles: styles, date: date });
    };
    CursorMarker.propTypes = {
        subscribeToCanvasMouseOver: PropTypes.func.isRequired,
        renderer: PropTypes.func
    };
    CursorMarker.defaultProps = {
        renderer: defaultRenderer
    };
    return CursorMarker;
}(React.Component));
// TODO: turn into HOC?
var CursorMarkerWrapper = function (props) {
    return (_jsx(MarkerCanvasConsumer, { children: function (_a) {
            var subscribeToMouseOver = _a.subscribeToMouseOver;
            return (_jsx(CursorMarker, __assign({ subscribeToCanvasMouseOver: subscribeToMouseOver }, props), void 0));
        } }, void 0));
};
CursorMarkerWrapper.displayName = 'CursorMarkerWrapper';
export default CursorMarkerWrapper;
