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
import { endOf, getNextUnit, startOf } from '../utility/calendar';
import { composeEvents } from '../utility/events';
var Interval = /** @class */ (function (_super) {
    __extends(Interval, _super);
    function Interval() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onIntervalClick = function () {
            var _a = _this.props, primaryHeader = _a.primaryHeader, interval = _a.interval, unit = _a.unit, showPeriod = _a.showPeriod;
            if (primaryHeader) {
                var nextUnit = getNextUnit(unit);
                var newStartTime = startOf(interval.startTime, nextUnit);
                var newEndTime = endOf(interval.startTime, nextUnit);
                showPeriod(newStartTime, newEndTime);
            }
            else {
                showPeriod(interval.startTime, interval.endTime);
            }
        };
        _this.getIntervalProps = function (props) {
            if (props === void 0) { props = {}; }
            return __assign(__assign({}, _this.props.getIntervalProps(__assign({ interval: _this.props.interval }, props))), { onClick: composeEvents(_this.onIntervalClick, props.onClick) });
        };
        return _this;
    }
    Interval.prototype.render = function () {
        var _a = this.props, intervalText = _a.intervalText, interval = _a.interval, intervalRenderer = _a.intervalRenderer, headerData = _a.headerData;
        var Renderer = intervalRenderer;
        if (Renderer) {
            return (_jsx(Renderer, { getIntervalProps: this.getIntervalProps, intervalContext: {
                    interval: interval,
                    intervalText: intervalText
                }, data: headerData }, void 0));
        }
        return (_jsx("div", __assign({ "data-testid": "dateHeaderInterval" }, this.getIntervalProps({}), { className: "rct-dateHeader " + (this.props.primaryHeader ? 'rct-dateHeader-primary' : '') }, { children: _jsx("span", { children: intervalText }, void 0) }), void 0));
    };
    Interval.propTypes = {
        intervalRenderer: PropTypes.func,
        unit: PropTypes.string.isRequired,
        interval: PropTypes.object.isRequired,
        showPeriod: PropTypes.func.isRequired,
        intervalText: PropTypes.string.isRequired,
        primaryHeader: PropTypes.bool.isRequired,
        getIntervalProps: PropTypes.func.isRequired,
        headerData: PropTypes.object
    };
    return Interval;
}(React.PureComponent));
export default Interval;
