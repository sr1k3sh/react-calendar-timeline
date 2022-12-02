export default TodayMarker;
/** Marker that is placed based on current date.  This component updates itself on
 * a set interval, dictated by the 'interval' prop.
 */
declare class TodayMarker extends React.Component<any, any, any> {
    static propTypes: {
        getLeftOffsetFromDate: PropTypes.Validator<(...args: any[]) => any>;
        renderer: PropTypes.Requireable<(...args: any[]) => any>;
        interval: PropTypes.Validator<number>;
    };
    static defaultProps: {
        renderer: ({ styles }: {
            styles: any;
        }) => JSX.Element;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    intervalToken: NodeJS.Timer | undefined;
    createIntervalUpdater(interval: any): NodeJS.Timer;
}
import React from "react";
import PropTypes from "prop-types";
