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
var defaultRenderer = (0, shared_1.createDefaultRenderer)('default-today-line');
/** Marker that is placed based on current date.  This component updates itself on
 * a set interval, dictated by the 'interval' prop.
 */
var TodayMarker = /** @class */ (function (_super) {
    __extends(TodayMarker, _super);
    function TodayMarker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            date: Date.now()
        };
        return _this;
    }
    TodayMarker.prototype.componentDidMount = function () {
        this.intervalToken = this.createIntervalUpdater(this.props.interval);
    };
    TodayMarker.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.interval !== this.props.interval) {
            clearInterval(this.intervalToken);
            this.intervalToken = this.createIntervalUpdater(this.props.interval);
        }
    };
    TodayMarker.prototype.createIntervalUpdater = function (interval) {
        var _this = this;
        return setInterval(function () {
            _this.setState({
                date: Date.now() // FIXME: use date utils pass in as props
            });
        }, interval);
    };
    TodayMarker.prototype.componentWillUnmount = function () {
        clearInterval(this.intervalToken);
    };
    TodayMarker.prototype.render = function () {
        var date = this.state.date;
        var leftOffset = this.props.getLeftOffsetFromDate(date);
        var styles = (0, shared_1.createMarkerStylesWithLeftOffset)(leftOffset);
        return this.props.renderer({ styles: styles, date: date });
    };
    TodayMarker.propTypes = {
        getLeftOffsetFromDate: prop_types_1.default.func.isRequired,
        renderer: prop_types_1.default.func,
        interval: prop_types_1.default.number.isRequired
    };
    TodayMarker.defaultProps = {
        renderer: defaultRenderer
    };
    return TodayMarker;
}(react_1.default.Component));
exports.default = TodayMarker;
