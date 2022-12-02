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
import { calculateXPositionForTime, calculateTimeForXPosition } from '../utility/calendar';
/* this context will hold all information regarding timeline state:
  1. timeline width
  2. visible time start and end
  3. canvas time start and end
  4. helpers for calculating left offset of items (and really...anything)
*/
/* eslint-disable no-console */
var defaultContextState = {
    getTimelineState: function () {
        console.warn('"getTimelineState" default func is being used');
    },
    getLeftOffsetFromDate: function () {
        console.warn('"getLeftOffsetFromDate" default func is being used');
    },
    getDateFromLeftOffsetPosition: function () {
        console.warn('"getDateFromLeftOffsetPosition" default func is being used');
    },
    showPeriod: function () {
        console.warn('"showPeriod" default func is being used');
    }
};
/* eslint-enable */
var _a = React.createContext(defaultContextState), Consumer = _a.Consumer, Provider = _a.Provider;
var TimelineStateProvider = /** @class */ (function (_super) {
    __extends(TimelineStateProvider, _super);
    function TimelineStateProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.getTimelineState = function () {
            var _a = _this.props, visibleTimeStart = _a.visibleTimeStart, visibleTimeEnd = _a.visibleTimeEnd, canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd, canvasWidth = _a.canvasWidth, timelineUnit = _a.timelineUnit, timelineWidth = _a.timelineWidth;
            return {
                visibleTimeStart: visibleTimeStart,
                visibleTimeEnd: visibleTimeEnd,
                canvasTimeStart: canvasTimeStart,
                canvasTimeEnd: canvasTimeEnd,
                canvasWidth: canvasWidth,
                timelineUnit: timelineUnit,
                timelineWidth: timelineWidth,
            }; // REVIEW,
        };
        _this.getLeftOffsetFromDate = function (date) {
            var _a = _this.props, canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd, canvasWidth = _a.canvasWidth;
            return calculateXPositionForTime(canvasTimeStart, canvasTimeEnd, canvasWidth, date);
        };
        _this.getDateFromLeftOffsetPosition = function (leftOffset) {
            var _a = _this.props, canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd, canvasWidth = _a.canvasWidth;
            return calculateTimeForXPosition(canvasTimeStart, canvasTimeEnd, canvasWidth, leftOffset);
        };
        _this.state = {
            timelineContext: {
                getTimelineState: _this.getTimelineState,
                getLeftOffsetFromDate: _this.getLeftOffsetFromDate,
                getDateFromLeftOffsetPosition: _this.getDateFromLeftOffsetPosition,
                showPeriod: _this.props.showPeriod,
            }
        };
        return _this;
    }
    TimelineStateProvider.prototype.render = function () {
        return (_jsx(Provider, __assign({ value: this.state.timelineContext }, { children: this.props.children }), void 0));
    };
    /* eslint-disable react/no-unused-prop-types */
    TimelineStateProvider.propTypes = {
        children: PropTypes.element.isRequired,
        visibleTimeStart: PropTypes.number.isRequired,
        visibleTimeEnd: PropTypes.number.isRequired,
        canvasTimeStart: PropTypes.number.isRequired,
        canvasTimeEnd: PropTypes.number.isRequired,
        canvasWidth: PropTypes.number.isRequired,
        showPeriod: PropTypes.func.isRequired,
        timelineUnit: PropTypes.string.isRequired,
        timelineWidth: PropTypes.number.isRequired,
    };
    return TimelineStateProvider;
}(React.Component));
export { TimelineStateProvider };
export var TimelineStateConsumer = Consumer;
