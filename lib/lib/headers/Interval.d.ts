export default Interval;
declare class Interval extends React.PureComponent<any, any, any> {
    static propTypes: {
        intervalRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        unit: PropTypes.Validator<string>;
        interval: PropTypes.Validator<object>;
        showPeriod: PropTypes.Validator<(...args: any[]) => any>;
        intervalText: PropTypes.Validator<string>;
        primaryHeader: PropTypes.Validator<boolean>;
        getIntervalProps: PropTypes.Validator<(...args: any[]) => any>;
        headerData: PropTypes.Requireable<object>;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    onIntervalClick: () => void;
    getIntervalProps: (props?: {}) => any;
}
import React from "react";
import PropTypes from "prop-types";
