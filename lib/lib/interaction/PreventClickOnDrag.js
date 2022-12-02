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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
var PreventClickOnDrag = /** @class */ (function (_super) {
    __extends(PreventClickOnDrag, _super);
    function PreventClickOnDrag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleMouseDown = function (evt) {
            _this.originClickX = evt.clientX;
        };
        _this.handleMouseUp = function (evt) {
            if (Math.abs(_this.originClickX - evt.clientX) > _this.props.clickTolerance) {
                _this.cancelClick = true;
            }
        };
        _this.handleClick = function (evt) {
            if (!_this.cancelClick) {
                _this.props.onClick(evt);
            }
            _this.cancelClick = false;
            _this.originClickX = null;
        };
        return _this;
    }
    PreventClickOnDrag.prototype.render = function () {
        var childElement = React.Children.only(this.props.children);
        return React.cloneElement(childElement, {
            onMouseDown: this.handleMouseDown,
            onMouseUp: this.handleMouseUp,
            onClick: this.handleClick
        });
    };
    PreventClickOnDrag.propTypes = {
        children: PropTypes.element.isRequired,
        onClick: PropTypes.func.isRequired,
        clickTolerance: PropTypes.number.isRequired
    };
    return PreventClickOnDrag;
}(Component));
export default PreventClickOnDrag;
