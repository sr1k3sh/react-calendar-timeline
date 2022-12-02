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
/**
 * Baseline styles to get the marker to render correctly
 */
var criticalStyles = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '2px',
    backgroundColor: 'black',
    // by default, pointer events (specifically click) will
    // "pass through".  This is added so that CursorMarker
    // will not get in the way of canvas click
    pointerEvents: 'none'
};
// FIXME: this creates a new object each time in render
// might want to memoize this?
export var createMarkerStylesWithLeftOffset = function (leftOffset) { return (__assign(__assign({}, criticalStyles), { left: leftOffset })); };
export var createDefaultRenderer = function (dataTestidValue) {
    // eslint-disable-next-line
    return function DefaultMarkerRenderer(_a) {
        var styles = _a.styles;
        return _jsx("div", { style: styles, "data-testid": dataTestidValue }, void 0);
    };
};
