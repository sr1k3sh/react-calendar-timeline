import { jsx as _jsx } from "react/jsx-runtime";
import { TimelineMarkersConsumer } from './TimelineMarkersContext';
import { TimelineMarkerType } from './markerType';
import TodayMarker from './implementations/TodayMarker';
import CustomMarker from './implementations/CustomMarker';
import { TimelineStateConsumer } from '../timeline/TimelineStateContext';
import CursorMarker from './implementations/CursorMarker';
/** Internal component used in timeline to render markers registered */
var TimelineMarkersRenderer = function () {
    return (_jsx(TimelineStateConsumer, { children: function (_a) {
            var getLeftOffsetFromDate = _a.getLeftOffsetFromDate, timeZone = _a.timeZone;
            return (_jsx(TimelineMarkersConsumer, { children: function (_a) {
                    var markers = _a.markers;
                    return markers.map(function (marker) {
                        switch (marker.type) {
                            case TimelineMarkerType.Today:
                                return (_jsx(TodayMarker, { getLeftOffsetFromDate: getLeftOffsetFromDate, renderer: marker.renderer, timeZone: timeZone, interval: marker.interval }, marker.id));
                            case TimelineMarkerType.Custom:
                                return (_jsx(CustomMarker, { renderer: marker.renderer, date: marker.date, getLeftOffsetFromDate: getLeftOffsetFromDate, timeZone: timeZone }, marker.id));
                            case TimelineMarkerType.Cursor:
                                return (_jsx(CursorMarker, { renderer: marker.renderer, getLeftOffsetFromDate: getLeftOffsetFromDate, timeZone: timeZone }, marker.id));
                            default:
                                return null;
                        }
                    });
                } }, void 0));
        } }, void 0));
};
export default TimelineMarkersRenderer;
