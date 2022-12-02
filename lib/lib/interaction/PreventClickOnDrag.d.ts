export default PreventClickOnDrag;
declare class PreventClickOnDrag extends React.Component<any, any, any> {
    static propTypes: {
        children: PropTypes.Validator<PropTypes.ReactElementLike>;
        onClick: PropTypes.Validator<(...args: any[]) => any>;
        clickTolerance: PropTypes.Validator<number>;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    handleMouseDown: (evt: any) => void;
    originClickX: any;
    handleMouseUp: (evt: any) => void;
    cancelClick: boolean | undefined;
    handleClick: (evt: any) => void;
}
import React from "react";
import PropTypes from "prop-types";
