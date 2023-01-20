export class CustomHeader extends React.Component<any, any, any> {
    static propTypes: {
        children: PropTypes.Validator<(...args: any[]) => any>;
        unit: PropTypes.Validator<string>;
        timeSteps: PropTypes.Validator<object>;
        visibleTimeStart: PropTypes.Validator<number>;
        visibleTimeEnd: PropTypes.Validator<number>;
        canvasTimeStart: PropTypes.Validator<number>;
        canvasTimeEnd: PropTypes.Validator<number>;
        canvasWidth: PropTypes.Validator<number>;
        showPeriod: PropTypes.Validator<(...args: any[]) => any>;
        headerData: PropTypes.Requireable<object>;
        getLeftOffsetFromDate: PropTypes.Validator<(...args: any[]) => any>;
        height: PropTypes.Validator<number>;
        timeZone: PropTypes.Requireable<string>;
    };
    constructor(props: any);
    getHeaderIntervals: ({ canvasTimeStart, canvasTimeEnd, unit, timeZone, timeSteps, getLeftOffsetFromDate }: {
        canvasTimeStart: any;
        canvasTimeEnd: any;
        unit: any;
        timeZone: any;
        timeSteps: any;
        getLeftOffsetFromDate: any;
    }) => any[];
    getRootProps: (props?: {}) => {
        style: any;
    };
    getIntervalProps: (props?: {}) => {
        style: any;
        key: string;
    };
    getIntervalStyle: ({ left, labelWidth, style }: {
        left: any;
        labelWidth: any;
        style: any;
    }) => any;
    getStateAndHelpers: () => {
        timelineContext: {
            timelineWidth: any;
            visibleTimeStart: any;
            visibleTimeEnd: any;
            canvasTimeStart: any;
            canvasTimeEnd: any;
        };
        headerContext: {
            unit: any;
            intervals: any[];
        };
        getRootProps: (props?: {}) => {
            style: any;
        };
        getIntervalProps: (props?: {}) => {
            style: any;
            key: string;
        };
        showPeriod: any;
        data: any;
    };
}
export default CustomHeaderWrapper;
import React from "react";
import PropTypes from "prop-types";
declare function CustomHeaderWrapper({ children, unit, headerData, height }: {
    children: any;
    unit: any;
    headerData: any;
    height: any;
}): JSX.Element;
declare namespace CustomHeaderWrapper {
    namespace propTypes {
        const children: PropTypes.Validator<(...args: any[]) => any>;
        const unit: PropTypes.Requireable<string>;
        const headerData: PropTypes.Requireable<object>;
        const height: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        const height_1: number;
        export { height_1 as height };
    }
}
