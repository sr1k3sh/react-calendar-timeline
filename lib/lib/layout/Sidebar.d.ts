export default class Sidebar extends React.Component<any, any, any> {
    static propTypes: {
        groups: PropTypes.Validator<object>;
        width: PropTypes.Validator<number>;
        height: PropTypes.Validator<number>;
        groupHeights: PropTypes.Validator<any[]>;
        keys: PropTypes.Validator<object>;
        groupRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        isRightSidebar: PropTypes.Requireable<boolean>;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    renderGroupContent(group: any, isRightSidebar: any, groupTitleKey: any, groupRightTitleKey: any): any;
}
import React from "react";
import PropTypes from "prop-types";
