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
var TimelineMarkersContext_1 = require("../TimelineMarkersContext");
var markerType_1 = require("../markerType");
var TodayMarker = /** @class */ (function (_super) {
    __extends(TodayMarker, _super);
    function TodayMarker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TodayMarker.prototype.componentDidMount = function () {
        var _a = this.props.subscribeMarker({
            type: markerType_1.TimelineMarkerType.Today,
            renderer: this.props.children,
            interval: this.props.interval
        }), unsubscribe = _a.unsubscribe, getMarker = _a.getMarker;
        this.unsubscribe = unsubscribe;
        this.getMarker = getMarker;
    };
    TodayMarker.prototype.componentWillUnmount = function () {
        if (this.unsubscribe != null) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    };
    TodayMarker.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.interval !== this.props.interval && this.getMarker) {
            var marker = this.getMarker();
            this.props.updateMarker(__assign(__assign({}, marker), { interval: this.props.interval }));
        }
    };
    TodayMarker.prototype.render = function () {
        return null;
    };
    TodayMarker.propTypes = {
        subscribeMarker: prop_types_1.default.func.isRequired,
        updateMarker: prop_types_1.default.func.isRequired,
        interval: prop_types_1.default.number,
        children: prop_types_1.default.func
    };
    TodayMarker.defaultProps = {
        interval: 1000 * 10 // default to ten seconds
    };
    return TodayMarker;
}(react_1.default.Component));
// TODO: turn into HOC?
var TodayMarkerWrapper = function (props) {
    return ((0, jsx_runtime_1.jsx)(TimelineMarkersContext_1.TimelineMarkersConsumer, { children: function (_a) {
            var subscribeMarker = _a.subscribeMarker, updateMarker = _a.updateMarker;
            return ((0, jsx_runtime_1.jsx)(TodayMarker, __assign({ subscribeMarker: subscribeMarker, updateMarker: updateMarker }, props), void 0));
        } }, void 0));
};
TodayMarkerWrapper.displayName = 'TodayMarkerWrapper';
exports.default = TodayMarkerWrapper;
