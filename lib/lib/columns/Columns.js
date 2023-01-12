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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import { Component } from 'react';
import { getYear, getMonth, getDate, getDay, getHours, getMinutes, getSeconds, getMilliseconds, getTime, getUnixTime } from 'date-fns';
import { iterateTimes } from '../utility/calendar';
import { TimelineStateConsumer } from '../timeline/TimelineStateContext';
var passThroughPropTypes = {
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    lineCount: PropTypes.number.isRequired,
    minUnit: PropTypes.string.isRequired,
    timeSteps: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    verticalLineClassNamesForTime: PropTypes.func
};
var getMap = {
    year: getYear,
    month: getMonth,
    date: getDate,
    hour: getHours,
    minute: getMinutes,
    second: getSeconds,
    millisecond: getMilliseconds,
};
var Columns = /** @class */ (function (_super) {
    __extends(Columns, _super);
    function Columns() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Columns.prototype.shouldComponentUpdate = function (nextProps) {
        return !(nextProps.canvasTimeStart === this.props.canvasTimeStart &&
            nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
            nextProps.canvasWidth === this.props.canvasWidth &&
            nextProps.lineCount === this.props.lineCount &&
            nextProps.minUnit === this.props.minUnit &&
            nextProps.timeSteps === this.props.timeSteps &&
            nextProps.height === this.props.height &&
            nextProps.verticalLineClassNamesForTime ===
                this.props.verticalLineClassNamesForTime);
    };
    Columns.prototype.render = function () {
        var _a = this.props, canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd, canvasWidth = _a.canvasWidth, minUnit = _a.minUnit, timeSteps = _a.timeSteps, height = _a.height, verticalLineClassNamesForTime = _a.verticalLineClassNamesForTime, getLeftOffsetFromDate = _a.getLeftOffsetFromDate;
        var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
        var lines = [];
        iterateTimes(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, function (time, nextTime) {
            var minUnitValue = getMap[minUnit === 'day' ? 'date' : minUnit](time);
            var firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);
            var classNamesForTime = [];
            if (verticalLineClassNamesForTime) {
                classNamesForTime = verticalLineClassNamesForTime(getUnixTime(time) * 1000, // turn into ms, which is what verticalLineClassNamesForTime expects
                getUnixTime(nextTime) * 1000 - 1);
            }
            // TODO: rename or remove class that has reference to vertical-line
            var classNames = 'rct-vl' +
                (firstOfType ? ' rct-vl-first' : '') +
                (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute'
                    ? " rct-day-" + getDay(time) + " "
                    : '') +
                classNamesForTime.join(' ');
            var left = getLeftOffsetFromDate(getTime(time));
            var right = getLeftOffsetFromDate(getTime(nextTime));
            lines.push(_jsx("div", { className: classNames, style: {
                    pointerEvents: 'none',
                    top: '0px',
                    left: left + "px",
                    width: right - left + "px",
                    height: height + "px"
                } }, "line-" + getTime(time)));
        });
        return _jsx("div", __assign({ className: "rct-vertical-lines" }, { children: lines }), void 0);
    };
    Columns.propTypes = __assign(__assign({}, passThroughPropTypes), { getLeftOffsetFromDate: PropTypes.func.isRequired });
    return Columns;
}(Component));
var ColumnsWrapper = function (_a) {
    var props = __rest(_a, []);
    return (_jsx(TimelineStateConsumer, { children: function (_a) {
            var getLeftOffsetFromDate = _a.getLeftOffsetFromDate;
            return (_jsx(Columns, __assign({ getLeftOffsetFromDate: getLeftOffsetFromDate }, props), void 0));
        } }, void 0));
};
ColumnsWrapper.defaultProps = __assign({}, passThroughPropTypes);
export default ColumnsWrapper;
