export default GroupRow;
declare class GroupRow extends React.Component<any, any, any> {
    static propTypes: {
        onClick: PropTypes.Validator<(...args: any[]) => any>;
        onDoubleClick: PropTypes.Validator<(...args: any[]) => any>;
        onContextMenu: PropTypes.Validator<(...args: any[]) => any>;
        isEvenRow: PropTypes.Validator<boolean>;
        style: PropTypes.Validator<object>;
        clickTolerance: PropTypes.Validator<number>;
        group: PropTypes.Validator<object>;
        horizontalLineClassNamesForGroup: PropTypes.Requireable<(...args: any[]) => any>;
    };
    constructor(props: any);
    constructor(props: any, context: any);
}
import React from "react";
import PropTypes from "prop-types";
