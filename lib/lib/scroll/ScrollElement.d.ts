export default ScrollElement;
declare class ScrollElement extends React.Component<any, any, any> {
    static propTypes: {
        children: PropTypes.Validator<PropTypes.ReactElementLike>;
        width: PropTypes.Validator<number>;
        height: PropTypes.Validator<number>;
        traditionalZoom: PropTypes.Validator<boolean>;
        scrollRef: PropTypes.Validator<(...args: any[]) => any>;
        isInteractingWithItem: PropTypes.Validator<boolean>;
        onZoom: PropTypes.Validator<(...args: any[]) => any>;
        onWheelZoom: PropTypes.Validator<(...args: any[]) => any>;
        onScroll: PropTypes.Validator<(...args: any[]) => any>;
    };
    constructor();
    /**
     * needed to handle scrolling with trackpad
     */
    handleScroll: () => void;
    refHandler: (el: any) => void;
    scrollComponent: any;
    handleWheel: (e: any) => void;
    handleMouseDown: (e: any) => void;
    dragStartPosition: any;
    dragLastPosition: any;
    handleMouseMove: (e: any) => void;
    handleMouseUp: () => void;
    handleMouseLeave: () => void;
    handleTouchStart: (e: any) => void;
    lastTouchDistance: number | null | undefined;
    singleTouchStart: {
        x: any;
        y: any;
        screenY: number;
    } | null | undefined;
    lastSingleTouch: {
        x: any;
        y: any;
        screenY: number;
    } | {
        x: any;
        y: any;
        screenY?: undefined;
    } | null | undefined;
    handleTouchMove: (e: any) => void;
    handleTouchEnd: () => void;
}
import React from "react";
import PropTypes from "prop-types";
