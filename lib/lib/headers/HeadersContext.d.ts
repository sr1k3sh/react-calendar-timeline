export class TimelineHeadersProvider extends React.Component<any, any, any> {
    static propTypes: {
        children: PropTypes.Validator<PropTypes.ReactElementLike>;
        rightSidebarWidth: PropTypes.Requireable<number>;
        leftSidebarWidth: PropTypes.Validator<number>;
        timeSteps: PropTypes.Validator<object>;
        registerScroll: PropTypes.Validator<(...args: any[]) => any>;
    };
    constructor(props: any);
    constructor(props: any, context: any);
}
export const TimelineHeadersConsumer: React.Consumer<{
    registerScroll: () => typeof noop;
    rightSidebarWidth: number;
    leftSidebarWidth: number;
    timeSteps: {};
}>;
import React from "react";
import PropTypes from "prop-types";
import { noop } from "../utility/generic";
