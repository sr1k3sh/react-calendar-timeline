export default class GroupRows extends React.Component<any, any, any> {
    static propTypes: {
        canvasWidth: PropTypes.Validator<number>;
        lineCount: PropTypes.Validator<number>;
        groupHeights: PropTypes.Validator<any[]>;
        onRowClick: PropTypes.Validator<(...args: any[]) => any>;
        onRowDoubleClick: PropTypes.Validator<(...args: any[]) => any>;
        clickTolerance: PropTypes.Validator<number>;
        groups: PropTypes.Validator<any[]>;
        horizontalLineClassNamesForGroup: PropTypes.Requireable<(...args: any[]) => any>;
        onRowContextClick: PropTypes.Validator<(...args: any[]) => any>;
    };
    constructor(props: any);
    constructor(props: any, context: any);
}
import React from "react";
import PropTypes from "prop-types";
