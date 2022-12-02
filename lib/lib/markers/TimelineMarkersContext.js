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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '../utility/generic';
var defaultContextState = {
    markers: [],
    subscribeMarker: function () {
        // eslint-disable-next-line
        console.warn('default subscribe marker used');
        return noop;
    }
};
var _a = React.createContext(defaultContextState), Consumer = _a.Consumer, Provider = _a.Provider;
// REVIEW: is this the best way to manage ids?
var _id = 0;
var createId = function () {
    _id += 1;
    return _id + 1;
};
var TimelineMarkersProvider = /** @class */ (function (_super) {
    __extends(TimelineMarkersProvider, _super);
    function TimelineMarkersProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSubscribeToMarker = function (newMarker) {
            newMarker = __assign(__assign({}, newMarker), { 
                // REVIEW: in the event that we accept id to be passed to the Marker components, this line would override those
                id: createId() });
            _this.setState(function (state) {
                return {
                    markers: __spreadArray(__spreadArray([], state.markers, true), [newMarker], false)
                };
            });
            return {
                unsubscribe: function () {
                    _this.setState(function (state) {
                        return {
                            markers: state.markers.filter(function (marker) { return marker.id !== newMarker.id; })
                        };
                    });
                },
                getMarker: function () {
                    return newMarker;
                }
            };
        };
        _this.handleUpdateMarker = function (updateMarker) {
            var markerIndex = _this.state.markers.findIndex(function (marker) { return marker.id === updateMarker.id; });
            if (markerIndex < 0)
                return;
            _this.setState(function (state) {
                return {
                    markers: __spreadArray(__spreadArray(__spreadArray([], state.markers.slice(0, markerIndex), true), [
                        updateMarker
                    ], false), state.markers.slice(markerIndex + 1), true)
                };
            });
        };
        _this.state = {
            markers: [],
            subscribeMarker: _this.handleSubscribeToMarker,
            updateMarker: _this.handleUpdateMarker
        };
        return _this;
    }
    TimelineMarkersProvider.prototype.render = function () {
        return _jsx(Provider, __assign({ value: this.state }, { children: this.props.children }), void 0);
    };
    TimelineMarkersProvider.propTypes = {
        children: PropTypes.element.isRequired
    };
    return TimelineMarkersProvider;
}(React.Component));
export { TimelineMarkersProvider };
export var TimelineMarkersConsumer = Consumer;
