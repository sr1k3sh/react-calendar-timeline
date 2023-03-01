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
var calendar_1 = require("../utility/calendar");
var events_1 = require("../utility/events");
var Interval = /** @class */ (function (_super) {
    __extends(Interval, _super);
    function Interval() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onIntervalClick = function () {
            var _a = _this.props, primaryHeader = _a.primaryHeader, interval = _a.interval, unit = _a.unit, showPeriod = _a.showPeriod;
            if (primaryHeader) {
                var nextUnit = (0, calendar_1.getNextUnit)(unit);
                var newStartTime = (0, calendar_1.startOf)(interval.startTime, nextUnit);
                var newEndTime = (0, calendar_1.endOf)(interval.startTime, nextUnit);
                showPeriod(newStartTime, newEndTime);
            }
            else {
                showPeriod(interval.startTime, interval.endTime);
            }
        };
        _this.getIntervalProps = function (props) {
            if (props === void 0) { props = {}; }
            return __assign(__assign({}, _this.props.getIntervalProps(__assign({ interval: _this.props.interval }, props))), { onClick: (0, events_1.composeEvents)(_this.onIntervalClick, props.onClick) });
        };
        return _this;
    }
    Interval.prototype.render = function () {
        var _a = this.props, intervalText = _a.intervalText, interval = _a.interval, intervalRenderer = _a.intervalRenderer, headerData = _a.headerData;
        var Renderer = intervalRenderer;
        if (Renderer) {
            return ((0, jsx_runtime_1.jsx)(Renderer, { getIntervalProps: this.getIntervalProps, intervalContext: {
                    interval: interval,
                    intervalText: intervalText
                }, data: headerData }, void 0));
        }
        return ((0, jsx_runtime_1.jsx)("div", __assign({ "data-testid": "dateHeaderInterval" }, this.getIntervalProps({}), { className: "rct-dateHeader " + (this.props.primaryHeader ? 'rct-dateHeader-primary' : '') }, { children: (0, jsx_runtime_1.jsx)("span", { children: intervalText }, void 0) }), void 0));
    };
    Interval.propTypes = {
        intervalRenderer: prop_types_1.default.func,
        unit: prop_types_1.default.string.isRequired,
        interval: prop_types_1.default.object.isRequired,
        showPeriod: prop_types_1.default.func.isRequired,
        intervalText: prop_types_1.default.string.isRequired,
        primaryHeader: prop_types_1.default.bool.isRequired,
        getIntervalProps: prop_types_1.default.func.isRequired,
        headerData: prop_types_1.default.object
    };
    return Interval;
}(react_1.default.PureComponent));
exports.default = Interval;
