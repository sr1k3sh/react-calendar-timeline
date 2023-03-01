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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var prop_types_1 = __importDefault(require("prop-types"));
var react_1 = require("react");
var date_fns_1 = require("date-fns");
var calendar_1 = require("../utility/calendar");
var TimelineStateContext_1 = require("../timeline/TimelineStateContext");
var passThroughPropTypes = {
    canvasTimeStart: prop_types_1.default.number.isRequired,
    canvasTimeEnd: prop_types_1.default.number.isRequired,
    canvasWidth: prop_types_1.default.number.isRequired,
    lineCount: prop_types_1.default.number.isRequired,
    minUnit: prop_types_1.default.string.isRequired,
    timeSteps: prop_types_1.default.object.isRequired,
    height: prop_types_1.default.number.isRequired,
    verticalLineClassNamesForTime: prop_types_1.default.func
};
var getMap = {
    year: date_fns_1.getYear,
    month: date_fns_1.getMonth,
    date: date_fns_1.getDate,
    hour: date_fns_1.getHours,
    minute: date_fns_1.getMinutes,
    second: date_fns_1.getSeconds,
    millisecond: date_fns_1.getMilliseconds,
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
        var _a = this.props, canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd, canvasWidth = _a.canvasWidth, minUnit = _a.minUnit, timeSteps = _a.timeSteps, height = _a.height, verticalLineClassNamesForTime = _a.verticalLineClassNamesForTime, getLeftOffsetFromDate = _a.getLeftOffsetFromDate, timeZone = _a.timeZone;
        var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
        var lines = [];
        (0, calendar_1.iterateTimes)(canvasTimeStart, canvasTimeEnd, minUnit, timeZone, timeSteps, function (time, nextTime) {
            var minUnitValue = getMap[minUnit === 'day' ? 'date' : minUnit](time);
            var firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);
            var classNamesForTime = [];
            if (verticalLineClassNamesForTime) {
                classNamesForTime = verticalLineClassNamesForTime((0, date_fns_1.getUnixTime)(time) * 1000, // turn into ms, which is what verticalLineClassNamesForTime expects
                (0, date_fns_1.getUnixTime)(nextTime) * 1000 - 1);
            }
            // TODO: rename or remove class that has reference to vertical-line
            var classNames = 'rct-vl' +
                (firstOfType ? ' rct-vl-first' : '') +
                (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute'
                    ? " rct-day-" + (0, date_fns_1.getDay)(time) + " "
                    : '') +
                classNamesForTime.join(' ');
            var left = getLeftOffsetFromDate((0, date_fns_1.getTime)(time));
            var right = getLeftOffsetFromDate((0, date_fns_1.getTime)(nextTime));
            lines.push((0, jsx_runtime_1.jsx)("div", { className: classNames, style: {
                    pointerEvents: 'none',
                    top: '0px',
                    left: left + "px",
                    width: right - left + "px",
                    height: height + "px"
                } }, "line-" + (0, date_fns_1.getTime)(time)));
        });
        return (0, jsx_runtime_1.jsx)("div", __assign({ className: "rct-vertical-lines" }, { children: lines }), void 0);
    };
    Columns.propTypes = __assign(__assign({}, passThroughPropTypes), { timeZone: prop_types_1.default.string, getLeftOffsetFromDate: prop_types_1.default.func.isRequired });
    return Columns;
}(react_1.Component));
var ColumnsWrapper = function (_a) {
    var props = __rest(_a, []);
    return ((0, jsx_runtime_1.jsx)(TimelineStateContext_1.TimelineStateConsumer, { children: function (_a) {
            var getLeftOffsetFromDate = _a.getLeftOffsetFromDate;
            return ((0, jsx_runtime_1.jsx)(Columns, __assign({ getLeftOffsetFromDate: getLeftOffsetFromDate }, props), void 0));
        } }, void 0));
};
ColumnsWrapper.defaultProps = __assign({}, passThroughPropTypes);
exports.default = ColumnsWrapper;
