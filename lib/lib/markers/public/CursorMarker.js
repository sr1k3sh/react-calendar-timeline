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
import { TimelineMarkersConsumer } from '../TimelineMarkersContext';
import { TimelineMarkerType } from '../markerType';
var CursorMarker = /** @class */ (function (_super) {
    __extends(CursorMarker, _super);
    function CursorMarker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CursorMarker.prototype.componentDidMount = function () {
        var unsubscribe = this.props.subscribeMarker({
            type: TimelineMarkerType.Cursor,
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
        subscribeMarker: PropTypes.func.isRequired,
        children: PropTypes.func
    };
    return CursorMarker;
}(React.Component));
// TODO: turn into HOC?
var CursorMarkerWrapper = function (props) {
    return (_jsx(TimelineMarkersConsumer, { children: function (_a) {
            var subscribeMarker = _a.subscribeMarker;
            return (_jsx(CursorMarker, __assign({ subscribeMarker: subscribeMarker }, props), void 0));
        } }, void 0));
};
CursorMarkerWrapper.displayName = 'CursorMarkerWrapper';
export default CursorMarkerWrapper;
