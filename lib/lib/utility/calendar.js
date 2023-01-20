var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { startOfYear, startOfQuarter, startOfMonth, startOfWeek, startOfISOWeek, startOfDay, startOfHour, startOfMinute, startOfSecond, endOfYear, endOfQuarter, endOfMonth, endOfWeek, endOfISOWeek, endOfDay, endOfHour, endOfMinute, endOfSecond, addYears, addQuarters, addMonths, addWeeks, addDays, addHours, addMinutes, addSeconds, addMilliseconds, getYear, setYear, getMonth, setMonth, getDate, setDate, getHours, setHours, getMinutes, setMinutes, getSeconds, setSeconds, getMilliseconds, setMilliseconds, getTime } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { _get } from './generic';
var startOfMap = {
    year: startOfYear,
    quarter: startOfQuarter,
    month: startOfMonth,
    week: startOfWeek,
    isoWeek: startOfISOWeek,
    day: startOfDay,
    date: startOfDay,
    hour: startOfHour,
    minute: startOfMinute,
    second: startOfSecond,
};
var endOfMap = {
    year: endOfYear,
    quarter: endOfQuarter,
    month: endOfMonth,
    week: endOfWeek,
    isoWeek: endOfISOWeek,
    day: endOfDay,
    date: endOfDay,
    hour: endOfHour,
    minute: endOfMinute,
    second: endOfSecond,
};
var addMap = {
    year: addYears,
    quarter: addQuarters,
    month: addMonths,
    week: addWeeks,
    day: addDays,
    hour: addHours,
    minute: addMinutes,
    second: addSeconds,
    millisecond: addMilliseconds,
};
var getMap = {
    year: getYear,
    month: getMonth,
    date: getDate,
    hour: getHours,
    minute: getMinutes,
    second: getSeconds,
    millisecond: getMilliseconds,
};
var setMap = {
    year: setYear,
    month: setMonth,
    date: setDate,
    hour: setHours,
    minute: setMinutes,
    second: setSeconds,
    millisecond: setMilliseconds,
};
/**
 * Calculate the ms / pixel ratio of the timeline state
 * @param {number} canvasTimeStart
 * @param {number} canvasTimeEnd
 * @param {number} canvasWidth
 * @returns {number}
 */
export function coordinateToTimeRatio(canvasTimeStart, canvasTimeEnd, canvasWidth) {
    return (canvasTimeEnd - canvasTimeStart) / canvasWidth;
}
/**
 * For a given time, calculate the pixel position given timeline state
 * (timeline width in px, canvas time range)
 * @param {number} canvasTimeStart
 * @param {number} canvasTimeEnd
 * @param {number} canvasWidth
 * @param {number} time
 * @returns {number}
 */
export function calculateXPositionForTime(canvasTimeStart, canvasTimeEnd, canvasWidth, time) {
    var widthToZoomRatio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
    var timeOffset = time - canvasTimeStart;
    return timeOffset * widthToZoomRatio;
}
/**
 * For a given x position (leftOffset) in pixels, calculate time based on
 * timeline state (timeline width in px, canvas time range)
 * @param {number} canvasTimeStart
 * @param {number} canvasTimeEnd
 * @param {number} canvasWidth
 * @param {number} leftOffset
 * @returns {number}
 */
export function calculateTimeForXPosition(canvasTimeStart, canvasTimeEnd, canvasWidth, leftOffset) {
    var timeToPxRatio = (canvasTimeEnd - canvasTimeStart) / canvasWidth;
    var timeFromCanvasTimeStart = timeToPxRatio * leftOffset;
    return timeFromCanvasTimeStart + canvasTimeStart;
}
export function iterateTimes(start, end, unit, timeZone, timeSteps, callback) {
    var time = startOfMap[unit](utcToZonedTime(start, timeZone).getTime());
    if (timeSteps[unit] && timeSteps[unit] > 1) {
        var value = getMap[unit](time);
        setMap[unit](time, value - value % timeSteps[unit]);
    }
    while (getTime(time) < end) {
        var nextTime = addMap[unit](time, timeSteps[unit] || 1);
        callback(time, nextTime);
        time = nextTime;
    }
}
// this function is VERY HOT as its used in Timeline.js render function
// TODO: check if there are performance implications here
// when "weeks" feature is implemented, this function will be modified heavily
/** determine the current rendered time unit based on timeline time span
 *
 * zoom: (in milliseconds) difference between time start and time end of timeline canvas
 * width: (in pixels) pixel width of timeline canvas
 * timeSteps: map of timeDividers with number to indicate step of each divider
 */
// the smallest cell we want to render is 17px
// this can be manipulated to make the breakpoints change more/less
// i.e. on zoom how often do we switch to the next unit of time
// i think this is the distance between cell lines
export var minCellWidth = 17;
export function getMinUnit(zoom, width, timeSteps) {
    // for supporting weeks, its important to remember that each of these
    // units has a natural progression to the other. i.e. a year is 12 months
    // a month is 24 days, a day is 24 hours.
    // with weeks this isnt the case so weeks needs to be handled specially
    var timeDividers = {
        second: 1000,
        minute: 60,
        hour: 60,
        day: 24,
        month: 30,
        year: 12
    };
    var minUnit = 'year';
    // this timespan is in ms initially
    var nextTimeSpanInUnitContext = zoom;
    Object.keys(timeDividers).some(function (unit) {
        // converts previous time span to current unit
        // (e.g. milliseconds to seconds, seconds to minutes, etc)
        nextTimeSpanInUnitContext = nextTimeSpanInUnitContext / timeDividers[unit];
        // timeSteps is "
        // With what step to display different units. E.g. 15 for minute means only minutes 0, 15, 30 and 45 will be shown."
        // how many cells would be rendered given this time span, for this unit?
        // e.g. for time span of 60 minutes, and time step of 1, we would render 60 cells
        var cellsToBeRenderedForCurrentUnit = nextTimeSpanInUnitContext / timeSteps[unit];
        // what is happening here? why 3 if time steps are greater than 1??
        var cellWidthToUse = timeSteps[unit] && timeSteps[unit] > 1 ? 3 * minCellWidth : minCellWidth;
        // for the minWidth of a cell, how many cells would be rendered given
        // the current pixel width
        // i.e. f
        var minimumCellsToRenderUnit = width / cellWidthToUse;
        if (cellsToBeRenderedForCurrentUnit < minimumCellsToRenderUnit) {
            // for the current zoom, the number of cells we'd need to render all parts of this unit
            // is less than the minimum number of cells needed at minimum cell width
            minUnit = unit;
            return true;
        }
    });
    return minUnit;
}
export function getNextUnit(unit) {
    var nextUnits = {
        second: 'minute',
        minute: 'hour',
        hour: 'day',
        day: 'month',
        month: 'year',
        year: 'year'
    };
    if (!nextUnits[unit]) {
        throw new Error("unit " + unit + " in not acceptable");
    }
    return nextUnits[unit];
}
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
export function calculateInteractionNewTimes(_a) {
    var itemTimeStart = _a.itemTimeStart, itemTimeEnd = _a.itemTimeEnd, dragTime = _a.dragTime, isDragging = _a.isDragging, isResizing = _a.isResizing, resizingEdge = _a.resizingEdge, resizeTime = _a.resizeTime;
    var originalItemRange = itemTimeEnd - itemTimeStart;
    var itemStart = isResizing && resizingEdge === 'left' ? resizeTime : itemTimeStart;
    var itemEnd = isResizing && resizingEdge === 'right' ? resizeTime : itemTimeEnd;
    return [
        isDragging ? dragTime : itemStart,
        isDragging ? dragTime + originalItemRange : itemEnd
    ];
}
export function calculateDimensions(_a) {
    var itemTimeStart = _a.itemTimeStart, itemTimeEnd = _a.itemTimeEnd, canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd, canvasWidth = _a.canvasWidth;
    var itemTimeRange = itemTimeEnd - itemTimeStart;
    // restrict startTime and endTime to be bounded by canvasTimeStart and canvasTimeEnd
    var effectiveStartTime = Math.max(itemTimeStart, canvasTimeStart);
    var effectiveEndTime = Math.min(itemTimeEnd, canvasTimeEnd);
    var left = calculateXPositionForTime(canvasTimeStart, canvasTimeEnd, canvasWidth, effectiveStartTime);
    var right = calculateXPositionForTime(canvasTimeStart, canvasTimeEnd, canvasWidth, effectiveEndTime);
    var itemWidth = right - left;
    var dimensions = {
        left: left,
        width: Math.max(itemWidth, 3),
        collisionLeft: itemTimeStart,
        collisionWidth: itemTimeRange
    };
    return dimensions;
}
/**
 * Get the order of groups based on their keys
 * @param {*} groups array of groups
 * @param {*} keys the keys object
 * @returns Ordered hash of objects with their array index and group
 */
export function getGroupOrders(groups, keys) {
    var groupIdKey = keys.groupIdKey;
    var groupOrders = {};
    for (var i = 0; i < groups.length; i++) {
        groupOrders[_get(groups[i], groupIdKey)] = { index: i, group: groups[i] };
    }
    return groupOrders;
}
/**
 * Adds items relevant to each group to the result of getGroupOrders
 * @param {*} items list of all items
 * @param {*} groupOrders the result of getGroupOrders
 */
export function getGroupedItems(items, groupOrders) {
    var groupedItems = {};
    var keys = Object.keys(groupOrders);
    // Initialize with result object for each group
    for (var i = 0; i < keys.length; i++) {
        var groupOrder = groupOrders[keys[i]];
        groupedItems[i] = {
            index: groupOrder.index,
            group: groupOrder.group,
            items: []
        };
    }
    // Populate groups
    for (var i = 0; i < items.length; i++) {
        if (items[i].dimensions.order !== undefined) {
            var groupItem = groupedItems[items[i].dimensions.order.index];
            if (groupItem) {
                groupItem.items.push(items[i]);
            }
        }
    }
    return groupedItems;
}
export function getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys) {
    var itemTimeStartKey = keys.itemTimeStartKey, itemTimeEndKey = keys.itemTimeEndKey;
    return items.filter(function (item) {
        return (_get(item, itemTimeStartKey) <= canvasTimeEnd &&
            _get(item, itemTimeEndKey) >= canvasTimeStart);
    });
}
var EPSILON = 0.001;
export function collision(a, b, lineHeight, collisionPadding) {
    if (collisionPadding === void 0) { collisionPadding = EPSILON; }
    // 2d collisions detection - https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    var verticalMargin = 0;
    return (a.collisionLeft + collisionPadding < b.collisionLeft + b.collisionWidth &&
        a.collisionLeft + a.collisionWidth - collisionPadding > b.collisionLeft &&
        a.top - verticalMargin + collisionPadding < b.top + b.height &&
        a.top + a.height + verticalMargin - collisionPadding > b.top);
}
/**
 * Calculate the position of a given item for a group that
 * is being stacked
 */
export function groupStack(lineHeight, item, group, groupHeight, groupTop, itemIndex) {
    // calculate non-overlapping positions
    var curHeight = groupHeight;
    var verticalMargin = (lineHeight - item.dimensions.height) / 2;
    if (item.dimensions.stack && item.dimensions.top === null) {
        item.dimensions.top = groupTop + verticalMargin;
        curHeight = Math.max(curHeight, lineHeight);
        do {
            var collidingItem = null;
            //Items are placed from i=0 onwards, only check items with index < i
            for (var j = itemIndex - 1, jj = 0; j >= jj; j--) {
                var other = group[j];
                if (other.dimensions.top !== null &&
                    other.dimensions.stack &&
                    collision(item.dimensions, other.dimensions, lineHeight)) {
                    collidingItem = other;
                    break;
                }
                else {
                    // console.log('dont test', other.top !== null, other !== item, other.stack);
                }
            }
            if (collidingItem != null) {
                // There is a collision. Reposition the items above the colliding element
                item.dimensions.top = collidingItem.dimensions.top + lineHeight;
                curHeight = Math.max(curHeight, item.dimensions.top + item.dimensions.height + verticalMargin - groupTop);
            }
        } while (collidingItem);
    }
    return {
        groupHeight: curHeight,
        verticalMargin: verticalMargin,
        itemTop: item.dimensions.top
    };
}
// Calculate the position of this item for a group that is not being stacked
export function groupNoStack(lineHeight, item, groupHeight, groupTop) {
    var verticalMargin = (lineHeight - item.dimensions.height) / 2;
    if (item.dimensions.top === null) {
        item.dimensions.top = groupTop + verticalMargin;
        groupHeight = Math.max(groupHeight, lineHeight);
    }
    return { groupHeight: groupHeight, verticalMargin: 0, itemTop: item.dimensions.top };
}
function sum(arr) {
    if (arr === void 0) { arr = []; }
    return arr.reduce(function (acc, i) { return acc + i; }, 0);
}
/**
 * Stack all groups
 * @param {*} items items to be stacked
 * @param {*} groupOrders the groupOrders object
 * @param {*} lineHeight
 * @param {*} stackItems should items be stacked?
 */
export function stackAll(itemsDimensions, groupOrders, lineHeight, stackItems) {
    var groupHeights = [];
    var groupTops = [];
    var groupedItems = getGroupedItems(itemsDimensions, groupOrders);
    for (var index in groupedItems) {
        var groupItems = groupedItems[index];
        var itemsDimensions_1 = groupItems.items, group = groupItems.group;
        var groupTop = sum(groupHeights);
        // Is group being stacked?
        var isGroupStacked = group.stackItems !== undefined ? group.stackItems : stackItems;
        var _a = stackGroup(itemsDimensions_1, isGroupStacked, lineHeight, groupTop), groupHeight = _a.groupHeight, verticalMargin = _a.verticalMargin;
        // If group height is overridden, push new height
        // Do this late as item position still needs to be calculated
        groupTops.push(groupTop);
        if (group.height) {
            groupHeights.push(group.height);
        }
        else {
            groupHeights.push(Math.max(groupHeight, lineHeight));
        }
    }
    return {
        height: sum(groupHeights),
        groupHeights: groupHeights,
        groupTops: groupTops
    };
}
/**
 *
 * @param {*} itemsDimensions
 * @param {*} isGroupStacked
 * @param {*} lineHeight
 * @param {*} groupTop
 */
export function stackGroup(itemsDimensions, isGroupStacked, lineHeight, groupTop) {
    var groupHeight = 0;
    var verticalMargin = 0;
    // Find positions for each item in group
    for (var itemIndex = 0; itemIndex < itemsDimensions.length; itemIndex++) {
        var r = {};
        if (isGroupStacked) {
            r = groupStack(lineHeight, itemsDimensions[itemIndex], itemsDimensions, groupHeight, groupTop, itemIndex);
        }
        else {
            r = groupNoStack(lineHeight, itemsDimensions[itemIndex], groupHeight, groupTop);
        }
        groupHeight = r.groupHeight;
        verticalMargin = r.verticalMargin;
    }
    return { groupHeight: groupHeight, verticalMargin: verticalMargin };
}
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
export function stackTimelineItems(items, groups, canvasWidth, canvasTimeStart, canvasTimeEnd, keys, lineHeight, itemHeightRatio, stackItems, draggingItem, resizingItem, dragTime, resizingEdge, resizeTime, newGroupOrder) {
    var visibleItems = getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys);
    var visibleItemsWithInteraction = visibleItems.map(function (item) {
        return getItemWithInteractions({
            item: item,
            keys: keys,
            draggingItem: draggingItem,
            resizingItem: resizingItem,
            dragTime: dragTime,
            resizingEdge: resizingEdge,
            resizeTime: resizeTime,
            groups: groups,
            newGroupOrder: newGroupOrder
        });
    });
    // if there are no groups return an empty array of dimensions
    if (groups.length === 0) {
        return {
            dimensionItems: [],
            height: 0,
            groupHeights: [],
            groupTops: []
        };
    }
    // Get the order of groups based on their id key
    var groupOrders = getGroupOrders(groups, keys);
    var dimensionItems = visibleItemsWithInteraction
        .map(function (item) {
        return getItemDimensions({
            item: item,
            keys: keys,
            canvasTimeStart: canvasTimeStart,
            canvasTimeEnd: canvasTimeEnd,
            canvasWidth: canvasWidth,
            groupOrders: groupOrders,
            lineHeight: lineHeight,
            itemHeightRatio: itemHeightRatio
        });
    })
        .filter(function (item) { return !!item; });
    // Get a new array of groupOrders holding the stacked items
    var _a = stackAll(dimensionItems, groupOrders, lineHeight, stackItems), height = _a.height, groupHeights = _a.groupHeights, groupTops = _a.groupTops;
    return { dimensionItems: dimensionItems, height: height, groupHeights: groupHeights, groupTops: groupTops };
}
/**
 * get canvas width from visible width
 * @param {*} width
 * @param {*} buffer
 */
export function getCanvasWidth(width, buffer) {
    if (buffer === void 0) { buffer = 3; }
    return width * buffer;
}
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
export function getItemDimensions(_a) {
    var item = _a.item, keys = _a.keys, canvasTimeStart = _a.canvasTimeStart, canvasTimeEnd = _a.canvasTimeEnd, canvasWidth = _a.canvasWidth, groupOrders = _a.groupOrders, lineHeight = _a.lineHeight, itemHeightRatio = _a.itemHeightRatio;
    var itemId = _get(item, keys.itemIdKey);
    var dimension = calculateDimensions({
        itemTimeStart: _get(item, keys.itemTimeStartKey),
        itemTimeEnd: _get(item, keys.itemTimeEndKey),
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth
    });
    if (dimension) {
        dimension.top = null;
        dimension.order = groupOrders[_get(item, keys.itemGroupKey)];
        dimension.stack = !item.isOverlay;
        dimension.height = lineHeight * itemHeightRatio;
        return {
            id: itemId,
            dimensions: dimension
        };
    }
}
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
export function getItemWithInteractions(_a) {
    var _b;
    var item = _a.item, keys = _a.keys, draggingItem = _a.draggingItem, resizingItem = _a.resizingItem, dragTime = _a.dragTime, resizingEdge = _a.resizingEdge, resizeTime = _a.resizeTime, groups = _a.groups, newGroupOrder = _a.newGroupOrder;
    if (!resizingItem && !draggingItem)
        return item;
    var itemId = _get(item, keys.itemIdKey);
    var isDragging = itemId === draggingItem;
    var isResizing = itemId === resizingItem;
    var _c = calculateInteractionNewTimes({
        itemTimeStart: _get(item, keys.itemTimeStartKey),
        itemTimeEnd: _get(item, keys.itemTimeEndKey),
        isDragging: isDragging,
        isResizing: isResizing,
        dragTime: dragTime,
        resizingEdge: resizingEdge,
        resizeTime: resizeTime
    }), itemTimeStart = _c[0], itemTimeEnd = _c[1];
    var newItem = __assign(__assign({}, item), (_b = {}, _b[keys.itemTimeStartKey] = itemTimeStart, _b[keys.itemTimeEndKey] = itemTimeEnd, _b[keys.itemGroupKey] = isDragging
        ? _get(groups[newGroupOrder], keys.groupIdKey)
        : _get(item, keys.itemGroupKey), _b));
    return newItem;
}
/**
 * get canvas start and end time from visible start and end time
 * @param {number} visibleTimeStart
 * @param {number} visibleTimeEnd
 */
export function getCanvasBoundariesFromVisibleTime(visibleTimeStart, visibleTimeEnd) {
    var zoom = visibleTimeEnd - visibleTimeStart;
    var canvasTimeStart = visibleTimeStart - (visibleTimeEnd - visibleTimeStart);
    var canvasTimeEnd = canvasTimeStart + zoom * 3;
    return [canvasTimeStart, canvasTimeEnd];
}
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
export function calculateScrollCanvas(visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, items, groups, props, state) {
    var oldCanvasTimeStart = state.canvasTimeStart;
    var oldZoom = state.visibleTimeEnd - state.visibleTimeStart;
    var newZoom = visibleTimeEnd - visibleTimeStart;
    var newState = { visibleTimeStart: visibleTimeStart, visibleTimeEnd: visibleTimeEnd };
    // Check if the current canvas covers the new times
    var canKeepCanvas = newZoom === oldZoom &&
        visibleTimeStart >= oldCanvasTimeStart + oldZoom * 0.5 &&
        visibleTimeStart <= oldCanvasTimeStart + oldZoom * 1.5 &&
        visibleTimeEnd >= oldCanvasTimeStart + oldZoom * 1.5 &&
        visibleTimeEnd <= oldCanvasTimeStart + oldZoom * 2.5;
    if (!canKeepCanvas || forceUpdateDimensions) {
        var _a = getCanvasBoundariesFromVisibleTime(visibleTimeStart, visibleTimeEnd), canvasTimeStart = _a[0], canvasTimeEnd = _a[1];
        newState.canvasTimeStart = canvasTimeStart;
        newState.canvasTimeEnd = canvasTimeEnd;
        var mergedState = __assign(__assign({}, state), newState);
        var canvasWidth = getCanvasWidth(mergedState.width);
        // The canvas cannot be kept, so calculate the new items position
        Object.assign(newState, stackTimelineItems(items, groups, canvasWidth, mergedState.canvasTimeStart, mergedState.canvasTimeEnd, props.keys, props.lineHeight, props.itemHeightRatio, props.stackItems, mergedState.draggingItem, mergedState.resizingItem, mergedState.dragTime, mergedState.resizingEdge, mergedState.resizeTime, mergedState.newGroupOrder));
    }
    return newState;
}
export function startOf(date, unit) {
    return startOfMap[unit](date);
}
export function endOf(date, unit) {
    return endOfMap[unit](date);
}
