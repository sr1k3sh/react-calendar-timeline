export default class Items extends React.Component<any, any, any> {
    static propTypes: {
        groups: PropTypes.Validator<object>;
        items: PropTypes.Validator<object>;
        canvasTimeStart: PropTypes.Validator<number>;
        canvasTimeEnd: PropTypes.Validator<number>;
        canvasWidth: PropTypes.Validator<number>;
        dragSnap: PropTypes.Requireable<number>;
        minResizeWidth: PropTypes.Requireable<number>;
        selectedItem: PropTypes.Requireable<string | number>;
        canChangeGroup: PropTypes.Validator<boolean>;
        canMove: PropTypes.Validator<boolean>;
        canResize: PropTypes.Requireable<string | boolean>;
        canSelect: PropTypes.Requireable<boolean>;
        keys: PropTypes.Validator<object>;
        moveResizeValidator: PropTypes.Requireable<(...args: any[]) => any>;
        itemSelect: PropTypes.Requireable<(...args: any[]) => any>;
        itemDrag: PropTypes.Requireable<(...args: any[]) => any>;
        itemDrop: PropTypes.Requireable<(...args: any[]) => any>;
        itemResizing: PropTypes.Requireable<(...args: any[]) => any>;
        itemResized: PropTypes.Requireable<(...args: any[]) => any>;
        onItemDoubleClick: PropTypes.Requireable<(...args: any[]) => any>;
        onItemContextMenu: PropTypes.Requireable<(...args: any[]) => any>;
        itemRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        selected: PropTypes.Requireable<any[]>;
        dimensionItems: PropTypes.Requireable<any[]>;
        groupTops: PropTypes.Requireable<any[]>;
        useResizeHandle: PropTypes.Requireable<boolean>;
        scrollRef: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        selected: never[];
    };
    constructor(props: any);
    constructor(props: any, context: any);
    isSelected(item: any, itemIdKey: any): any;
    getVisibleItems(canvasTimeStart: any, canvasTimeEnd: any): any;
}
import React from "react";
import PropTypes from "prop-types";
