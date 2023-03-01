"use strict";
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
exports.CustomDateHeader = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Interval_1 = __importDefault(require("./Interval"));
var date_fns_1 = require("date-fns");
function CustomDateHeader(_a) {
    var _b = _a.headerContext, intervals = _b.intervals, unit = _b.unit, getRootProps = _a.getRootProps, getIntervalProps = _a.getIntervalProps, showPeriod = _a.showPeriod, _c = _a.data, style = _c.style, intervalRenderer = _c.intervalRenderer, className = _c.className, getLabelFormat = _c.getLabelFormat, unitProp = _c.unitProp, headerData = _c.headerData;
    return ((0, jsx_runtime_1.jsx)("div", __assign({ "data-testid": "dateHeader", className: className }, getRootProps({ style: style }), { children: intervals.map(function (interval) {
            var intervalText = getLabelFormat([interval.startTime, interval.endTime], unit, interval.labelWidth);
            return ((0, jsx_runtime_1.jsx)(Interval_1.default, { unit: unit, interval: interval, showPeriod: showPeriod, intervalText: intervalText, primaryHeader: unitProp === 'primaryHeader', getIntervalProps: getIntervalProps, intervalRenderer: intervalRenderer, headerData: headerData }, "label-" + (0, date_fns_1.getTime)(interval.startTime)));
        }) }), void 0));
}
exports.CustomDateHeader = CustomDateHeader;
