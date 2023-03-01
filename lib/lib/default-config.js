"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSubHeaderLabelFormats = exports.defaultHeaderLabelFormats = exports.defaultHeaderFormats = exports.defaultTimeSteps = exports.defaultKeys = void 0;
exports.defaultKeys = {
    groupIdKey: 'id',
    groupTitleKey: 'title',
    groupRightTitleKey: 'rightTitle',
    groupLabelKey: 'title',
    itemIdKey: 'id',
    itemTitleKey: 'title',
    itemDivTitleKey: 'title',
    itemGroupKey: 'group',
    itemTimeStartKey: 'start_time',
    itemTimeEndKey: 'end_time'
};
exports.defaultTimeSteps = {
    second: 1,
    minute: 1,
    hour: 1,
    day: 1,
    month: 1,
    year: 1
};
exports.defaultHeaderFormats = {
    year: {
        long: 'yyyy',
        mediumLong: 'yyyy',
        medium: 'yyyy',
        short: 'yy'
    },
    month: {
        long: 'MMMM yyyy',
        mediumLong: 'MMMM',
        medium: 'MMMM',
        short: 'MM/yy'
    },
    week: {
        long: 'w',
        mediumLong: 'w',
        medium: 'w',
        short: 'w'
    },
    day: {
        long: 'EEEE, MMMM d, yyyy',
        mediumLong: 'EEEEEE, MMMM d, yyyy',
        medium: 'EEEEEE d',
        short: 'd'
    },
    hour: {
        long: 'EEEEEE, MMMM d, yyyy, HH:00',
        mediumLong: 'd/M/yyyy, HH:00',
        medium: 'HH:00',
        short: 'HH'
    },
    minute: {
        long: 'HH:mm',
        mediumLong: 'HH:mm',
        medium: 'HH:mm',
        short: 'mm',
    }
};
//TODO: delete this
exports.defaultHeaderLabelFormats = {
    yearShort: 'yy',
    yearLong: 'yyyy',
    monthShort: 'MM/yy',
    monthMedium: 'MM/yyyy',
    monthMediumLong: 'MMM yyyy',
    monthLong: 'MMMM yyyy',
    dayShort: 'L',
    dayLong: 'EEEE, LL',
    hourShort: 'HH',
    hourMedium: 'HH:00',
    hourMediumLong: 'L, HH:00',
    hourLong: 'EEEE, LL, HH:00',
    time: 'LLL'
};
//TODO: delete this
exports.defaultSubHeaderLabelFormats = {
    yearShort: 'yy',
    yearLong: 'yyyy',
    monthShort: 'MM',
    monthMedium: 'MMM',
    monthLong: 'MMMM',
    dayShort: 'd',
    dayMedium: 'EEEEEE d',
    dayMediumLong: 'EEE, do',
    dayLong: 'EEEE, do',
    hourShort: 'HH',
    hourLong: 'HH:00',
    minuteShort: 'mm',
    minuteLong: 'HH:mm'
};
