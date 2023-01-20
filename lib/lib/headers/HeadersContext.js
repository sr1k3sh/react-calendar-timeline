var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '../utility/generic';
var defaultContextState = {
    registerScroll: function () {
        // eslint-disable-next-line
        console.warn('default registerScroll header used');
        return noop;
    },
    rightSidebarWidth: 0,
    leftSidebarWidth: 150,
    timeSteps: {}
};
var _a = React.createContext(defaultContextState), Consumer = _a.Consumer, Provider = _a.Provider;
var TimelineHeadersProvider = /** @class */ (function (_super) {
    __extends(TimelineHeadersProvider, _super);
    function TimelineHeadersProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimelineHeadersProvider.prototype.render = function () {
        var contextValue = {
            rightSidebarWidth: this.props.rightSidebarWidth,
            leftSidebarWidth: this.props.leftSidebarWidth,
            timeSteps: this.props.timeSteps,
            registerScroll: this.props.registerScroll,
            timeZone: this.props.timeZone
        };
        return _jsx(Provider, __assign({ value: contextValue }, { children: this.props.children }), void 0);
    };
    TimelineHeadersProvider.propTypes = {
        children: PropTypes.element.isRequired,
        rightSidebarWidth: PropTypes.number,
        leftSidebarWidth: PropTypes.number.isRequired,
        //TODO: maybe this should be skipped?
        timeSteps: PropTypes.object.isRequired,
        registerScroll: PropTypes.func.isRequired,
        timeZone: PropTypes.string.isRequired
    };
    return TimelineHeadersProvider;
}(React.Component));
export { TimelineHeadersProvider };
export var TimelineHeadersConsumer = Consumer;
