export default CustomMarker;
/**
 * CustomMarker that is placed based on passed in date prop
 */
declare class CustomMarker extends React.Component<any, any, any> {
    static propTypes: {
        getLeftOffsetFromDate: PropTypes.Validator<(...args: any[]) => any>;
        renderer: PropTypes.Requireable<(...args: any[]) => any>;
        date: PropTypes.Validator<number>;
    };
    static defaultProps: {
        renderer: ({ styles }: {
            styles: any;
        }) => JSX.Element;
    };
    constructor(props: any);
    constructor(props: any, context: any);
}
import React from "react";
import PropTypes from "prop-types";
