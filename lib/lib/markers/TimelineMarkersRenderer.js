"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var TimelineMarkersContext_1 = require("./TimelineMarkersContext");
var markerType_1 = require("./markerType");
var TodayMarker_1 = __importDefault(require("./implementations/TodayMarker"));
var CustomMarker_1 = __importDefault(require("./implementations/CustomMarker"));
var TimelineStateContext_1 = require("../timeline/TimelineStateContext");
var CursorMarker_1 = __importDefault(require("./implementations/CursorMarker"));
/** Internal component used in timeline to render markers registered */
var TimelineMarkersRenderer = function () {
    return ((0, jsx_runtime_1.jsx)(TimelineStateContext_1.TimelineStateConsumer, { children: function (_a) {
            var getLeftOffsetFromDate = _a.getLeftOffsetFromDate, timeZone = _a.timeZone;
            return ((0, jsx_runtime_1.jsx)(TimelineMarkersContext_1.TimelineMarkersConsumer, { children: function (_a) {
                    var markers = _a.markers;
                    return markers.map(function (marker) {
                        switch (marker.type) {
                            case markerType_1.TimelineMarkerType.Today:
                                return ((0, jsx_runtime_1.jsx)(TodayMarker_1.default, { getLeftOffsetFromDate: getLeftOffsetFromDate, renderer: marker.renderer, timeZone: timeZone, interval: marker.interval }, marker.id));
                            case markerType_1.TimelineMarkerType.Custom:
                                return ((0, jsx_runtime_1.jsx)(CustomMarker_1.default, { renderer: marker.renderer, date: marker.date, getLeftOffsetFromDate: getLeftOffsetFromDate, timeZone: timeZone }, marker.id));
                            case markerType_1.TimelineMarkerType.Cursor:
                                return ((0, jsx_runtime_1.jsx)(CursorMarker_1.default, { renderer: marker.renderer, getLeftOffsetFromDate: getLeftOffsetFromDate, timeZone: timeZone }, marker.id));
                            default:
                                return null;
                        }
                    });
                } }, void 0));
        } }, void 0));
};
exports.default = TimelineMarkersRenderer;
