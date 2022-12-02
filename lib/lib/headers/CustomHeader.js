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
import { TimelineHeadersConsumer } from './HeadersContext';
import { TimelineStateConsumer } from '../timeline/TimelineStateContext';
import { iterateTimes } from '../utility/calendar';
import { getTime } from 'date-fns';
var CustomHeader = /** @class */ (function (_super) {
    __extends(CustomHeader, _super);
    function CustomHeader(props) {
        var _this = _super.call(this, props) || this;
        _this.getHeaderIntervals = function (_a) {
            var canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd, unit = _a.unit, timeSteps = _a.timeSteps, getLeftOffsetFromDate = _a.getLeftOffsetFromDate;
            var intervals = [];
            iterateTimes(canvasTimeStart, canvasTimeEnd, unit, timeSteps, function (startTime, endTime) {
                var left = getLeftOffsetFromDate(getTime(startTime));
                var right = getLeftOffsetFromDate(getTime(endTime));
                var width = right - left;
                intervals.push({
                    startTime: startTime,
                    endTime: endTime,
                    labelWidth: width,
                    left: left
                });
            });
            return intervals;
        };
        _this.getRootProps = function (props) {
            if (props === void 0) { props = {}; }
            var style = props.style;
            return {
                style: Object.assign({}, style ? style : {}, {
                    position: 'relative',
                    width: _this.props.canvasWidth,
                    height: _this.props.height,
                })
            };
        };
        _this.getIntervalProps = function (props) {
            if (props === void 0) { props = {}; }
            var interval = props.interval, style = props.style;
            if (!interval)
                throw new Error('you should provide interval to the prop getter');
            var startTime = interval.startTime, labelWidth = interval.labelWidth, left = interval.left;
            return {
                style: _this.getIntervalStyle({
                    style: style,
                    startTime: startTime,
                    labelWidth: labelWidth,
                    canvasTimeStart: _this.props.canvasTimeStart,
                    unit: _this.props.unit,
                    left: left
                }),
                key: "label-" + getTime(startTime)
            };
        };
        _this.getIntervalStyle = function (_a) {
            var left = _a.left, labelWidth = _a.labelWidth, style = _a.style;
            return __assign(__assign({}, style), { left: left, width: labelWidth, position: 'absolute' });
        };
        _this.getStateAndHelpers = function () {
            var _a = _this.props, canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd, unit = _a.unit, showPeriod = _a.showPeriod, timelineWidth = _a.timelineWidth, visibleTimeStart = _a.visibleTimeStart, visibleTimeEnd = _a.visibleTimeEnd, headerData = _a.headerData;
            //TODO: only evaluate on changing params
            return {
                timelineContext: {
                    timelineWidth: timelineWidth,
                    visibleTimeStart: visibleTimeStart,
                    visibleTimeEnd: visibleTimeEnd,
                    canvasTimeStart: canvasTimeStart,
                    canvasTimeEnd: canvasTimeEnd
                },
                headerContext: {
                    unit: unit,
                    intervals: _this.state.intervals
                },
                getRootProps: _this.getRootProps,
                getIntervalProps: _this.getIntervalProps,
                showPeriod: showPeriod,
                data: headerData,
            };
        };
        var canvasTimeStart = props.canvasTimeStart, canvasTimeEnd = props.canvasTimeEnd, canvasWidth = props.canvasWidth, unit = props.unit, timeSteps = props.timeSteps, showPeriod = props.showPeriod, getLeftOffsetFromDate = props.getLeftOffsetFromDate;
        var intervals = _this.getHeaderIntervals({
            canvasTimeStart: canvasTimeStart,
            canvasTimeEnd: canvasTimeEnd,
            canvasWidth: canvasWidth,
            unit: unit,
            timeSteps: timeSteps,
            showPeriod: showPeriod,
            getLeftOffsetFromDate: getLeftOffsetFromDate
        });
        _this.state = {
            intervals: intervals
        };
        return _this;
    }
    CustomHeader.prototype.shouldComponentUpdate = function (nextProps) {
        if (nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
            nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
            nextProps.canvasWidth !== this.props.canvasWidth ||
            nextProps.unit !== this.props.unit ||
            nextProps.timeSteps !== this.props.timeSteps ||
            nextProps.showPeriod !== this.props.showPeriod ||
            nextProps.children !== this.props.children ||
            nextProps.headerData !== this.props.headerData) {
            return true;
        }
        return false;
    };
    CustomHeader.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
            nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
            nextProps.canvasWidth !== this.props.canvasWidth ||
            nextProps.unit !== this.props.unit ||
            nextProps.timeSteps !== this.props.timeSteps ||
            nextProps.showPeriod !== this.props.showPeriod) {
            var canvasTimeStart = nextProps.canvasTimeStart, canvasTimeEnd = nextProps.canvasTimeEnd, canvasWidth = nextProps.canvasWidth, unit = nextProps.unit, timeSteps = nextProps.timeSteps, showPeriod = nextProps.showPeriod, getLeftOffsetFromDate = nextProps.getLeftOffsetFromDate;
            var intervals = this.getHeaderIntervals({
                canvasTimeStart: canvasTimeStart,
                canvasTimeEnd: canvasTimeEnd,
                canvasWidth: canvasWidth,
                unit: unit,
                timeSteps: timeSteps,
                showPeriod: showPeriod,
                getLeftOffsetFromDate: getLeftOffsetFromDate
            });
            this.setState({ intervals: intervals });
        }
    };
    CustomHeader.prototype.render = function () {
        var props = this.getStateAndHelpers();
        var Renderer = this.props.children;
        return _jsx(Renderer, __assign({}, props), void 0);
    };
    CustomHeader.propTypes = {
        //component props
        children: PropTypes.func.isRequired,
        unit: PropTypes.string.isRequired,
        //Timeline context
        timeSteps: PropTypes.object.isRequired,
        visibleTimeStart: PropTypes.number.isRequired,
        visibleTimeEnd: PropTypes.number.isRequired,
        canvasTimeStart: PropTypes.number.isRequired,
        canvasTimeEnd: PropTypes.number.isRequired,
        canvasWidth: PropTypes.number.isRequired,
        showPeriod: PropTypes.func.isRequired,
        headerData: PropTypes.object,
        getLeftOffsetFromDate: PropTypes.func.isRequired,
        height: PropTypes.number.isRequired,
    };
    return CustomHeader;
}(React.Component));
export { CustomHeader };
var CustomHeaderWrapper = function (_a) {
    var children = _a.children, unit = _a.unit, headerData = _a.headerData, height = _a.height;
    return (_jsx(TimelineStateConsumer, { children: function (_a) {
            var getTimelineState = _a.getTimelineState, showPeriod = _a.showPeriod, getLeftOffsetFromDate = _a.getLeftOffsetFromDate;
            var timelineState = getTimelineState();
            return (_jsx(TimelineHeadersConsumer, { children: function (_a) {
                    var timeSteps = _a.timeSteps;
                    return (_jsx(CustomHeader, __assign({ children: children, timeSteps: timeSteps, showPeriod: showPeriod, unit: unit ? unit : timelineState.timelineUnit }, timelineState, { headerData: headerData, getLeftOffsetFromDate: getLeftOffsetFromDate, height: height }), void 0));
                } }, void 0));
        } }, void 0));
};
CustomHeaderWrapper.propTypes = {
    children: PropTypes.func.isRequired,
    unit: PropTypes.string,
    headerData: PropTypes.object,
    height: PropTypes.number,
};
CustomHeaderWrapper.defaultProps = {
    height: 30,
};
export default CustomHeaderWrapper;
