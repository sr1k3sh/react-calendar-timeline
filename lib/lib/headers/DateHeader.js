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
import { TimelineStateConsumer } from '../timeline/TimelineStateContext';
import CustomHeader from './CustomHeader';
import { getNextUnit } from '../utility/calendar';
import { defaultHeaderFormats } from '../default-config';
import memoize from 'memoize-one';
import { CustomDateHeader } from './CustomDateHeader';
import { format as _format } from 'date-fns';
import DateContext from '../DateContext';
var DateHeader = /** @class */ (function (_super) {
    __extends(DateHeader, _super);
    function DateHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getHeaderUnit = function () {
            if (_this.props.unit === 'primaryHeader') {
                return getNextUnit(_this.props.timelineUnit);
            }
            else if (_this.props.unit) {
                return _this.props.unit;
            }
            return _this.props.timelineUnit;
        };
        _this.getRootStyle = memoize(function (style) {
            return __assign({ height: 30 }, style);
        });
        _this.getLabelFormat = function (interval, unit, labelWidth) {
            var labelFormat = _this.props.labelFormat;
            if (typeof labelFormat === 'string') {
                var startTime = interval[0];
                return _format(startTime, labelFormat, { locale: _this.context.locale });
            }
            else if (typeof labelFormat === 'function') {
                return labelFormat(interval, unit, labelWidth, _this.context);
            }
            else {
                throw new Error('labelFormat should be function or string');
            }
        };
        _this.getHeaderData = memoize(function (intervalRenderer, style, className, getLabelFormat, unitProp, headerData) {
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
        return (_jsx(CustomHeader, { unit: unit, height: height, headerData: this.getHeaderData(this.props.intervalRenderer, this.getRootStyle(this.props.style), this.props.className, this.getLabelFormat, this.props.unit, this.props.headerData), children: CustomDateHeader }, void 0));
    };
    DateHeader.propTypes = {
        unit: PropTypes.string,
        style: PropTypes.object,
        className: PropTypes.string,
        timelineUnit: PropTypes.string,
        labelFormat: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
            PropTypes.string
        ]).isRequired,
        intervalRenderer: PropTypes.func,
        headerData: PropTypes.object,
        height: PropTypes.number
    };
    DateHeader.contextType = DateContext;
    return DateHeader;
}(React.Component));
var DateHeaderWrapper = function (_a) {
    var unit = _a.unit, labelFormat = _a.labelFormat, style = _a.style, className = _a.className, intervalRenderer = _a.intervalRenderer, headerData = _a.headerData, height = _a.height;
    return (_jsx(TimelineStateConsumer, { children: function (_a) {
            var getTimelineState = _a.getTimelineState;
            var timelineState = getTimelineState();
            return (_jsx(DateHeader, { timelineUnit: timelineState.timelineUnit, unit: unit, labelFormat: labelFormat, style: style, className: className, intervalRenderer: intervalRenderer, headerData: headerData, height: height }, void 0));
        } }, void 0));
};
DateHeaderWrapper.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    unit: PropTypes.string,
    labelFormat: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
        PropTypes.string
    ]),
    intervalRenderer: PropTypes.func,
    headerData: PropTypes.object,
    height: PropTypes.number
};
DateHeaderWrapper.defaultProps = {
    labelFormat: formatLabel
};
function formatLabel(_a, unit, labelWidth, dateContext, formatOptions) {
    var timeStart = _a[0], timeEnd = _a[1];
    if (formatOptions === void 0) { formatOptions = defaultHeaderFormats; }
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
    return _format(timeStart, format, { locale: dateContext.locale });
}
export default DateHeaderWrapper;
