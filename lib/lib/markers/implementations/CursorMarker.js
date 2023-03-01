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
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var shared_1 = require("./shared");
var MarkerCanvasContext_1 = require("../MarkerCanvasContext");
var defaultRenderer = (0, shared_1.createDefaultRenderer)('default-cursor-marker');
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
        var styles = (0, shared_1.createMarkerStylesWithLeftOffset)(leftOffset);
        return this.props.renderer({ styles: styles, date: date });
    };
    CursorMarker.propTypes = {
        subscribeToCanvasMouseOver: prop_types_1.default.func.isRequired,
        renderer: prop_types_1.default.func
    };
    CursorMarker.defaultProps = {
        renderer: defaultRenderer
    };
    return CursorMarker;
}(react_1.default.Component));
// TODO: turn into HOC?
var CursorMarkerWrapper = function (props) {
    return ((0, jsx_runtime_1.jsx)(MarkerCanvasContext_1.MarkerCanvasConsumer, { children: function (_a) {
            var subscribeToMouseOver = _a.subscribeToMouseOver;
            return ((0, jsx_runtime_1.jsx)(CursorMarker, __assign({ subscribeToCanvasMouseOver: subscribeToMouseOver }, props), void 0));
        } }, void 0));
};
CursorMarkerWrapper.displayName = 'CursorMarkerWrapper';
exports.default = CursorMarkerWrapper;
