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
import Interval from './Interval';
import { getTime } from 'date-fns';
export function CustomDateHeader(_a) {
    var _b = _a.headerContext, intervals = _b.intervals, unit = _b.unit, getRootProps = _a.getRootProps, getIntervalProps = _a.getIntervalProps, showPeriod = _a.showPeriod, _c = _a.data, style = _c.style, intervalRenderer = _c.intervalRenderer, className = _c.className, getLabelFormat = _c.getLabelFormat, unitProp = _c.unitProp, headerData = _c.headerData;
    return (_jsx("div", __assign({ "data-testid": "dateHeader", className: className }, getRootProps({ style: style }), { children: intervals.map(function (interval) {
            var intervalText = getLabelFormat([interval.startTime, interval.endTime], unit, interval.labelWidth);
            return (_jsx(Interval, { unit: unit, interval: interval, showPeriod: showPeriod, intervalText: intervalText, primaryHeader: unitProp === 'primaryHeader', getIntervalProps: getIntervalProps, intervalRenderer: intervalRenderer, headerData: headerData }, "label-" + getTime(interval.startTime)));
        }) }), void 0));
}
