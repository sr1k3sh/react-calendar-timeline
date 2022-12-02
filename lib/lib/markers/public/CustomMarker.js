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
            type: TimelineMarkerType.Custom,
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
        subscribeMarker: PropTypes.func.isRequired,
        updateMarker: PropTypes.func.isRequired,
        children: PropTypes.func,
        date: PropTypes.number.isRequired
    };
    return CustomMarker;
}(React.Component));
// TODO: turn into HOC?
var CustomMarkerWrapper = function (props) {
    return (_jsx(TimelineMarkersConsumer, { children: function (_a) {
            var subscribeMarker = _a.subscribeMarker, updateMarker = _a.updateMarker;
            return (_jsx(CustomMarker, __assign({ subscribeMarker: subscribeMarker, updateMarker: updateMarker }, props), void 0));
        } }, void 0));
};
CustomMarkerWrapper.displayName = 'CustomMarkerWrapper';
export default CustomMarkerWrapper;
