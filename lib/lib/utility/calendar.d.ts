/**
 * Calculate the ms / pixel ratio of the timeline state
 * @param {number} canvasTimeStart
 * @param {number} canvasTimeEnd
 * @param {number} canvasWidth
 * @returns {number}
 */
export function coordinateToTimeRatio(canvasTimeStart: number, canvasTimeEnd: number, canvasWidth: number): number;
/**
 * For a given time, calculate the pixel position given timeline state
 * (timeline width in px, canvas time range)
 * @param {number} canvasTimeStart
 * @param {number} canvasTimeEnd
 * @param {number} canvasWidth
 * @param {number} time
 * @returns {number}
 */
export function calculateXPositionForTime(canvasTimeStart: number, canvasTimeEnd: number, canvasWidth: number, time: number): number;
/**
 * For a given x position (leftOffset) in pixels, calculate time based on
 * timeline state (timeline width in px, canvas time range)
 * @param {number} canvasTimeStart
 * @param {number} canvasTimeEnd
 * @param {number} canvasWidth
 * @param {number} leftOffset
 * @returns {number}
 */
export function calculateTimeForXPosition(canvasTimeStart: number, canvasTimeEnd: number, canvasWidth: number, leftOffset: number): number;
export function iterateTimes(start: any, end: any, unit: any, timeZone: any, timeSteps: any, callback: any): void;
export function getMinUnit(zoom: any, width: any, timeSteps: any): string;
export function getNextUnit(unit: any): any;
/**
 * get the new start and new end time of item that is being
 * dragged or resized
 * @param {*} itemTimeStart original item time in milliseconds
 * @param {*} itemTimeEnd original item time in milliseconds
 * @param {*} dragTime new start time if item is dragged in milliseconds
 * @param {*} isDragging is item being dragged
 * @param {*} isResizing is item being resized
 * @param {`right` or `left`} resizingEdge resize edge
 * @param {*} resizeTime new resize time in milliseconds
 */
export function calculateInteractionNewTimes({ itemTimeStart, itemTimeEnd, dragTime, isDragging, isResizing, resizingEdge, resizeTime }: any): any[];
export function calculateDimensions({ itemTimeStart, itemTimeEnd, canvasTimeStart, canvasTimeEnd, canvasWidth }: {
    itemTimeStart: any;
    itemTimeEnd: any;
    canvasTimeStart: any;
    canvasTimeEnd: any;
    canvasWidth: any;
}): {
    left: number;
    width: number;
    collisionLeft: any;
    collisionWidth: number;
};
/**
 * Get the order of groups based on their keys
 * @param {*} groups array of groups
 * @param {*} keys the keys object
 * @returns Ordered hash of objects with their array index and group
 */
export function getGroupOrders(groups: any, keys: any): {};
/**
 * Adds items relevant to each group to the result of getGroupOrders
 * @param {*} items list of all items
 * @param {*} groupOrders the result of getGroupOrders
 */
export function getGroupedItems(items: any, groupOrders: any): {};
export function getVisibleItems(items: any, canvasTimeStart: any, canvasTimeEnd: any, keys: any): any;
export function collision(a: any, b: any, lineHeight: any, collisionPadding?: number): boolean;
/**
 * Calculate the position of a given item for a group that
 * is being stacked
 */
export function groupStack(lineHeight: any, item: any, group: any, groupHeight: any, groupTop: any, itemIndex: any): {
    groupHeight: any;
    verticalMargin: number;
    itemTop: any;
};
export function groupNoStack(lineHeight: any, item: any, groupHeight: any, groupTop: any): {
    groupHeight: any;
    verticalMargin: number;
    itemTop: any;
};
/**
 * Stack all groups
 * @param {*} items items to be stacked
 * @param {*} groupOrders the groupOrders object
 * @param {*} lineHeight
 * @param {*} stackItems should items be stacked?
 */
export function stackAll(itemsDimensions: any, groupOrders: any, lineHeight: any, stackItems: any): {
    height: any;
    groupHeights: any[];
    groupTops: any[];
};
/**
 *
 * @param {*} itemsDimensions
 * @param {*} isGroupStacked
 * @param {*} lineHeight
 * @param {*} groupTop
 */
export function stackGroup(itemsDimensions: any, isGroupStacked: any, lineHeight: any, groupTop: any): {
    groupHeight: number;
    verticalMargin: number;
};
/**
 * Stack the items that will be visible
 * within the canvas area
 * @param {item[]} items
 * @param {group[]} groups
 * @param {number} canvasWidth
 * @param {number} canvasTimeStart
 * @param {number} canvasTimeEnd
 * @param {*} keys
 * @param {number} lineHeight
 * @param {number} itemHeightRatio
 * @param {boolean} stackItems
 * @param {*} draggingItem
 * @param {*} resizingItem
 * @param {number} dragTime
 * @param {left or right} resizingEdge
 * @param {number} resizeTime
 * @param {number} newGroupOrder
 */
export function stackTimelineItems(items: any[], groups: any[], canvasWidth: number, canvasTimeStart: number, canvasTimeEnd: number, keys: any, lineHeight: number, itemHeightRatio: number, stackItems: boolean, draggingItem: any, resizingItem: any, dragTime: number, resizingEdge: any, resizeTime: number, newGroupOrder: number): {
    dimensionItems: any;
    height: any;
    groupHeights: any[];
    groupTops: any[];
};
/**
 * get canvas width from visible width
 * @param {*} width
 * @param {*} buffer
 */
export function getCanvasWidth(width: any, buffer?: any): number;
/**
 * get item's position, dimensions and collisions
 * @param {*} item
 * @param {*} keys
 * @param {*} canvasTimeStart
 * @param {*} canvasTimeEnd
 * @param {*} canvasWidth
 * @param {*} groupOrders
 * @param {*} lineHeight
 * @param {*} itemHeightRatio
 */
export function getItemDimensions({ item, keys, canvasTimeStart, canvasTimeEnd, canvasWidth, groupOrders, lineHeight, itemHeightRatio }: any): {
    id: any;
    dimensions: {
        left: number;
        width: number;
        collisionLeft: any;
        collisionWidth: number;
    };
} | undefined;
/**
 * get new item with changed  `itemTimeStart` , `itemTimeEnd` and `itemGroupKey` according to user interaction
 * user interaction is dragging an item and resize left and right
 * @param {*} item
 * @param {*} keys
 * @param {*} draggingItem
 * @param {*} resizingItem
 * @param {*} dragTime
 * @param {*} resizingEdge
 * @param {*} resizeTime
 * @param {*} groups
 * @param {*} newGroupOrder
 */
export function getItemWithInteractions({ item, keys, draggingItem, resizingItem, dragTime, resizingEdge, resizeTime, groups, newGroupOrder }: any): any;
/**
 * get canvas start and end time from visible start and end time
 * @param {number} visibleTimeStart
 * @param {number} visibleTimeEnd
 */
export function getCanvasBoundariesFromVisibleTime(visibleTimeStart: number, visibleTimeEnd: number): number[];
/**
 * Get the the canvas area for a given visible time
 * Will shift the start/end of the canvas if the visible time
 * does not fit within the existing
 * @param {number} visibleTimeStart
 * @param {number} visibleTimeEnd
 * @param {boolean} forceUpdateDimensions
 * @param {*} items
 * @param {*} groups
 * @param {*} props
 * @param {*} state
 */
export function calculateScrollCanvas(visibleTimeStart: number, visibleTimeEnd: number, forceUpdateDimensions: boolean, items: any, groups: any, props: any, state: any): {
    visibleTimeStart: number;
    visibleTimeEnd: number;
};
export function startOf(date: any, unit: any): any;
export function endOf(date: any, unit: any): any;
/** determine the current rendered time unit based on timeline time span
 *
 * zoom: (in milliseconds) difference between time start and time end of timeline canvas
 * width: (in pixels) pixel width of timeline canvas
 * timeSteps: map of timeDividers with number to indicate step of each divider
 */
export const minCellWidth: 17;
