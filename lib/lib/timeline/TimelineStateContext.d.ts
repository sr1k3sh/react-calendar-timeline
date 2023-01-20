export class TimelineStateProvider extends React.Component<any, any, any> {
    static propTypes: {
        children: PropTypes.Validator<PropTypes.ReactElementLike>;
        visibleTimeStart: PropTypes.Validator<number>;
        visibleTimeEnd: PropTypes.Validator<number>;
        canvasTimeStart: PropTypes.Validator<number>;
        canvasTimeEnd: PropTypes.Validator<number>;
        canvasWidth: PropTypes.Validator<number>;
        showPeriod: PropTypes.Validator<(...args: any[]) => any>;
        timelineUnit: PropTypes.Validator<string>;
        timelineWidth: PropTypes.Validator<number>;
        timeZone: PropTypes.Requireable<string>;
    };
    constructor(props: any);
    getTimelineState: () => {
        visibleTimeStart: any;
        visibleTimeEnd: any;
        canvasTimeStart: any;
        canvasTimeEnd: any;
        canvasWidth: any;
        timelineUnit: any;
        timelineWidth: any;
    };
    getLeftOffsetFromDate: (date: any) => number;
    getDateFromLeftOffsetPosition: (leftOffset: any) => number;
}
export const TimelineStateConsumer: React.Consumer<{
    getTimelineState: () => void;
    getLeftOffsetFromDate: () => void;
    getDateFromLeftOffsetPosition: () => void;
    showPeriod: () => void;
}>;
import React from "react";
import PropTypes from "prop-types";
