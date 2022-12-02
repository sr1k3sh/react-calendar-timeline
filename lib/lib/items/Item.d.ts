export const ItemContext: React.Context<{
    getTimelineContext: () => void;
}>;
export default class Item extends React.Component<any, any, any> {
    static propTypes: {
        canvasTimeStart: PropTypes.Validator<number>;
        canvasTimeEnd: PropTypes.Validator<number>;
        canvasWidth: PropTypes.Validator<number>;
        order: PropTypes.Requireable<object>;
        dragSnap: PropTypes.Requireable<number>;
        minResizeWidth: PropTypes.Requireable<number>;
        selected: PropTypes.Requireable<boolean>;
        canChangeGroup: PropTypes.Validator<boolean>;
        canMove: PropTypes.Validator<boolean>;
        canResizeLeft: PropTypes.Validator<boolean>;
        canResizeRight: PropTypes.Validator<boolean>;
        keys: PropTypes.Validator<object>;
        item: PropTypes.Validator<object>;
        onSelect: PropTypes.Requireable<(...args: any[]) => any>;
        onDrag: PropTypes.Requireable<(...args: any[]) => any>;
        onDrop: PropTypes.Requireable<(...args: any[]) => any>;
        onResizing: PropTypes.Requireable<(...args: any[]) => any>;
        onResized: PropTypes.Requireable<(...args: any[]) => any>;
        onContextMenu: PropTypes.Requireable<(...args: any[]) => any>;
        itemRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        itemProps: PropTypes.Requireable<object>;
        canSelect: PropTypes.Requireable<boolean>;
        dimensions: PropTypes.Requireable<object>;
        groupTops: PropTypes.Requireable<any[]>;
        useResizeHandle: PropTypes.Requireable<boolean>;
        moveResizeValidator: PropTypes.Requireable<(...args: any[]) => any>;
        onItemDoubleClick: PropTypes.Requireable<(...args: any[]) => any>;
        scrollRef: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        selected: boolean;
        itemRenderer: {
            ({ item, itemContext, getItemProps, getResizeProps }: {
                item: any;
                itemContext: any;
                getItemProps: any;
                getResizeProps: any;
            }): JSX.Element;
            propTypes: {
                item: PropTypes.Requireable<any>;
                itemContext: PropTypes.Requireable<any>;
                getItemProps: PropTypes.Requireable<any>;
                getResizeProps: PropTypes.Requireable<any>;
            };
        };
    };
    static contextType: React.Context<{
        getTimelineContext: () => void;
    }>;
    constructor(props: any);
    cacheDataFromProps(props: any): void;
    itemId: any;
    itemTitle: any;
    itemDivTitle: any;
    itemTimeStart: any;
    itemTimeEnd: any;
    getTimeRatio(): number;
    dragTimeSnap(dragTime: any, considerOffset: any): any;
    resizeTimeSnap(dragTime: any): any;
    dragTime(e: any): any;
    timeFor(e: any): any;
    dragGroupDelta(e: any): number;
    resizeTimeDelta(e: any, resizeEdge: any): any;
    mountInteract(): void;
    canResizeLeft(props?: Readonly<any>): boolean;
    canResizeRight(props?: Readonly<any>): boolean;
    canMove(props?: Readonly<any>): boolean;
    onMouseDown: (e: any) => void;
    startedClicking: boolean | undefined;
    onMouseUp: (e: any) => void;
    onTouchStart: (e: any) => void;
    startedTouching: boolean | undefined;
    onTouchEnd: (e: any) => void;
    handleDoubleClick: (e: any) => void;
    handleContextMenu: (e: any) => void;
    actualClick(e: any, clickType: any): void;
    getItemRef: (el: any) => any;
    item: any;
    getDragLeftRef: (el: any) => any;
    dragLeft: any;
    getDragRightRef: (el: any) => any;
    dragRight: any;
    getItemProps: (props?: {}) => {
        key: any;
        ref: (el: any) => any;
        title: any;
        className: string;
        onMouseDown: (event: any, ...args: any[]) => void;
        onMouseUp: (event: any, ...args: any[]) => void;
        onTouchStart: (event: any, ...args: any[]) => void;
        onTouchEnd: (event: any, ...args: any[]) => void;
        onDoubleClick: (event: any, ...args: any[]) => void;
        onContextMenu: (event: any, ...args: any[]) => void;
        style: any;
    };
    getResizeProps: (props?: {}) => {
        left: {
            ref: (el: any) => any;
            className: string;
            style: any;
        };
        right: {
            ref: (el: any) => any;
            className: string;
            style: any;
        };
    };
    getItemStyle(props: any): any;
}
import React from "react";
import PropTypes from "prop-types";
