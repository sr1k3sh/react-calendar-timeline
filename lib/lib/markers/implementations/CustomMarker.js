"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var shared_1 = require("./shared");
var defaultCustomMarkerRenderer = (0, shared_1.createDefaultRenderer)('default-customer-marker-id');
/**
 * CustomMarker that is placed based on passed in date prop
 */
var CustomMarker = /** @class */ (function (_super) {
    __extends(CustomMarker, _super);
    function CustomMarker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomMarker.prototype.render = function () {
        var date = this.props.date;
        var leftOffset = this.props.getLeftOffsetFromDate(date);
        var styles = (0, shared_1.createMarkerStylesWithLeftOffset)(leftOffset);
        return this.props.renderer({ styles: styles, date: date });
    };
    CustomMarker.propTypes = {
        getLeftOffsetFromDate: prop_types_1.default.func.isRequired,
        renderer: prop_types_1.default.func,
        date: prop_types_1.default.number.isRequired
    };
    CustomMarker.defaultProps = {
        renderer: defaultCustomMarkerRenderer
    };
    return CustomMarker;
}(react_1.default.Component));
exports.default = CustomMarker;
