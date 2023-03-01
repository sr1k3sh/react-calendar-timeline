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
exports.TimelineStateConsumer = exports.TimelineStateProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var calendar_1 = require("../utility/calendar");
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
var _a = react_1.default.createContext(defaultContextState), Consumer = _a.Consumer, Provider = _a.Provider;
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
            return (0, calendar_1.calculateXPositionForTime)(canvasTimeStart, canvasTimeEnd, canvasWidth, date);
        };
        _this.getDateFromLeftOffsetPosition = function (leftOffset) {
            var _a = _this.props, canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd, canvasWidth = _a.canvasWidth;
            return (0, calendar_1.calculateTimeForXPosition)(canvasTimeStart, canvasTimeEnd, canvasWidth, leftOffset);
        };
        _this.state = {
            timelineContext: {
                getTimelineState: _this.getTimelineState,
                getLeftOffsetFromDate: _this.getLeftOffsetFromDate,
                getDateFromLeftOffsetPosition: _this.getDateFromLeftOffsetPosition,
                showPeriod: _this.props.showPeriod,
                timeZone: _this.props.timeZone,
            }
        };
        return _this;
    }
    TimelineStateProvider.prototype.render = function () {
        return ((0, jsx_runtime_1.jsx)(Provider, __assign({ value: this.state.timelineContext }, { children: this.props.children }), void 0));
    };
    /* eslint-disable react/no-unused-prop-types */
    TimelineStateProvider.propTypes = {
        children: prop_types_1.default.element.isRequired,
        visibleTimeStart: prop_types_1.default.number.isRequired,
        visibleTimeEnd: prop_types_1.default.number.isRequired,
        canvasTimeStart: prop_types_1.default.number.isRequired,
        canvasTimeEnd: prop_types_1.default.number.isRequired,
        canvasWidth: prop_types_1.default.number.isRequired,
        showPeriod: prop_types_1.default.func.isRequired,
        timelineUnit: prop_types_1.default.string.isRequired,
        timelineWidth: prop_types_1.default.number.isRequired,
        timeZone: prop_types_1.default.string,
    };
    return TimelineStateProvider;
}(react_1.default.Component));
exports.TimelineStateProvider = TimelineStateProvider;
exports.TimelineStateConsumer = Consumer;
