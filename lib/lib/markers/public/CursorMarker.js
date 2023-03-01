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
var CursorMarker = /** @class */ (function (_super) {
    __extends(CursorMarker, _super);
    function CursorMarker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CursorMarker.prototype.componentDidMount = function () {
        var unsubscribe = this.props.subscribeMarker({
            type: markerType_1.TimelineMarkerType.Cursor,
            renderer: this.props.children
        }).unsubscribe;
        this.unsubscribe = unsubscribe;
    };
    CursorMarker.prototype.componentWillUnmount = function () {
        if (this.unsubscribe != null) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    };
    CursorMarker.prototype.render = function () {
        return null;
    };
    CursorMarker.propTypes = {
        subscribeMarker: prop_types_1.default.func.isRequired,
        children: prop_types_1.default.func
    };
    return CursorMarker;
}(react_1.default.Component));
// TODO: turn into HOC?
var CursorMarkerWrapper = function (props) {
    return ((0, jsx_runtime_1.jsx)(TimelineMarkersContext_1.TimelineMarkersConsumer, { children: function (_a) {
            var subscribeMarker = _a.subscribeMarker;
            return ((0, jsx_runtime_1.jsx)(CursorMarker, __assign({ subscribeMarker: subscribeMarker }, props), void 0));
        } }, void 0));
};
CursorMarkerWrapper.displayName = 'CursorMarkerWrapper';
exports.default = CursorMarkerWrapper;
