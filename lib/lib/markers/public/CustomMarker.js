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
var CustomMarker = /** @class */ (function (_super) {
    __extends(CustomMarker, _super);
    function CustomMarker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomMarker.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.date !== this.props.date && this.getMarker) {
            var marker = this.getMarker();
            this.props.updateMarker(__assign(__assign({}, marker), { date: this.props.date }));
        }
    };
    CustomMarker.prototype.componentDidMount = function () {
        var _a = this.props.subscribeMarker({
            type: markerType_1.TimelineMarkerType.Custom,
            renderer: this.props.children,
            date: this.props.date
        }), unsubscribe = _a.unsubscribe, getMarker = _a.getMarker;
        this.unsubscribe = unsubscribe;
        this.getMarker = getMarker;
    };
    CustomMarker.prototype.componentWillUnmount = function () {
        if (this.unsubscribe != null) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    };
    CustomMarker.prototype.render = function () {
        return null;
    };
    CustomMarker.propTypes = {
        subscribeMarker: prop_types_1.default.func.isRequired,
        updateMarker: prop_types_1.default.func.isRequired,
        children: prop_types_1.default.func,
        date: prop_types_1.default.number.isRequired
    };
    return CustomMarker;
}(react_1.default.Component));
// TODO: turn into HOC?
var CustomMarkerWrapper = function (props) {
    return ((0, jsx_runtime_1.jsx)(TimelineMarkersContext_1.TimelineMarkersConsumer, { children: function (_a) {
            var subscribeMarker = _a.subscribeMarker, updateMarker = _a.updateMarker;
            return ((0, jsx_runtime_1.jsx)(CustomMarker, __assign({ subscribeMarker: subscribeMarker, updateMarker: updateMarker }, props), void 0));
        } }, void 0));
};
CustomMarkerWrapper.displayName = 'CustomMarkerWrapper';
exports.default = CustomMarkerWrapper;
