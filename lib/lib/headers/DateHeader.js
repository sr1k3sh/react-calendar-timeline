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
var TimelineStateContext_1 = require("../timeline/TimelineStateContext");
var CustomHeader_1 = __importDefault(require("./CustomHeader"));
var calendar_1 = require("../utility/calendar");
var default_config_1 = require("../default-config");
var memoize_one_1 = __importDefault(require("memoize-one"));
var CustomDateHeader_1 = require("./CustomDateHeader");
var date_fns_1 = require("date-fns");
var DateContext_1 = __importDefault(require("../DateContext"));
var DateHeader = /** @class */ (function (_super) {
    __extends(DateHeader, _super);
    function DateHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getHeaderUnit = function () {
            if (_this.props.unit === 'primaryHeader') {
                return (0, calendar_1.getNextUnit)(_this.props.timelineUnit);
            }
            else if (_this.props.unit) {
                return _this.props.unit;
            }
            return _this.props.timelineUnit;
        };
        _this.getRootStyle = (0, memoize_one_1.default)(function (style) {
            return __assign({ height: 30 }, style);
        });
        _this.getLabelFormat = function (interval, unit, labelWidth) {
            var labelFormat = _this.props.labelFormat;
            if (typeof labelFormat === 'string') {
                var startTime = interval[0];
                return (0, date_fns_1.format)(startTime, labelFormat, { locale: _this.context.locale });
            }
            else if (typeof labelFormat === 'function') {
                return labelFormat(interval, unit, labelWidth, _this.context);
            }
            else {
                throw new Error('labelFormat should be function or string');
            }
        };
        _this.getHeaderData = (0, memoize_one_1.default)(function (intervalRenderer, style, className, getLabelFormat, unitProp, headerData) {
            return {
                intervalRenderer: intervalRenderer,
                style: style,
                className: className,
                getLabelFormat: getLabelFormat,
                unitProp: unitProp,
                headerData: headerData
            };
        });
        return _this;
    }
    DateHeader.prototype.render = function () {
        var unit = this.getHeaderUnit();
        var _a = this.props, headerData = _a.headerData, height = _a.height;
        return ((0, jsx_runtime_1.jsx)(CustomHeader_1.default, { unit: unit, height: height, headerData: this.getHeaderData(this.props.intervalRenderer, this.getRootStyle(this.props.style), this.props.className, this.getLabelFormat, this.props.unit, this.props.headerData), children: CustomDateHeader_1.CustomDateHeader }, void 0));
    };
    DateHeader.propTypes = {
        unit: prop_types_1.default.string,
        style: prop_types_1.default.object,
        className: prop_types_1.default.string,
        timelineUnit: prop_types_1.default.string,
        labelFormat: prop_types_1.default.oneOfType([
            prop_types_1.default.func,
            prop_types_1.default.objectOf(prop_types_1.default.objectOf(prop_types_1.default.string)),
            prop_types_1.default.string
        ]).isRequired,
        intervalRenderer: prop_types_1.default.func,
        headerData: prop_types_1.default.object,
        height: prop_types_1.default.number
    };
    DateHeader.contextType = DateContext_1.default;
    return DateHeader;
}(react_1.default.Component));
var DateHeaderWrapper = function (_a) {
    var unit = _a.unit, labelFormat = _a.labelFormat, style = _a.style, className = _a.className, intervalRenderer = _a.intervalRenderer, headerData = _a.headerData, height = _a.height;
    return ((0, jsx_runtime_1.jsx)(TimelineStateContext_1.TimelineStateConsumer, { children: function (_a) {
            var getTimelineState = _a.getTimelineState;
            var timelineState = getTimelineState();
            return ((0, jsx_runtime_1.jsx)(DateHeader, { timelineUnit: timelineState.timelineUnit, unit: unit, labelFormat: labelFormat, style: style, className: className, intervalRenderer: intervalRenderer, headerData: headerData, height: height }, void 0));
        } }, void 0));
};
DateHeaderWrapper.propTypes = {
    style: prop_types_1.default.object,
    className: prop_types_1.default.string,
    unit: prop_types_1.default.string,
    labelFormat: prop_types_1.default.oneOfType([
        prop_types_1.default.func,
        prop_types_1.default.objectOf(prop_types_1.default.objectOf(prop_types_1.default.string)),
        prop_types_1.default.string
    ]),
    intervalRenderer: prop_types_1.default.func,
    headerData: prop_types_1.default.object,
    height: prop_types_1.default.number
};
DateHeaderWrapper.defaultProps = {
    labelFormat: formatLabel
};
function formatLabel(_a, unit, labelWidth, dateContext, formatOptions) {
    var timeStart = _a[0], timeEnd = _a[1];
    if (formatOptions === void 0) { formatOptions = default_config_1.defaultHeaderFormats; }
    var format;
    if (labelWidth >= 150) {
        format = formatOptions[unit]['long'];
    }
    else if (labelWidth >= 100) {
        format = formatOptions[unit]['mediumLong'];
    }
    else if (labelWidth >= 50) {
        format = formatOptions[unit]['medium'];
    }
    else {
        format = formatOptions[unit]['short'];
    }
    return (0, date_fns_1.format)(timeStart, format, { locale: dateContext.locale });
}
exports.default = DateHeaderWrapper;
