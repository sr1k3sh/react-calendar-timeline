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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var prop_types_1 = __importDefault(require("prop-types"));
var react_1 = __importStar(require("react"));
var generic_1 = require("../utility/generic");
var Sidebar = /** @class */ (function (_super) {
    __extends(Sidebar, _super);
    function Sidebar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sidebar.prototype.shouldComponentUpdate = function (nextProps) {
        return !(nextProps.keys === this.props.keys &&
            nextProps.width === this.props.width &&
            nextProps.height === this.props.height &&
            (0, generic_1.arraysEqual)(nextProps.groups, this.props.groups) &&
            (0, generic_1.arraysEqual)(nextProps.groupHeights, this.props.groupHeights));
    };
    Sidebar.prototype.renderGroupContent = function (group, isRightSidebar, groupTitleKey, groupRightTitleKey) {
        if (this.props.groupRenderer) {
            return react_1.default.createElement(this.props.groupRenderer, {
                group: group,
                isRightSidebar: isRightSidebar
            });
        }
        else {
            return (0, generic_1._get)(group, isRightSidebar ? groupRightTitleKey : groupTitleKey);
        }
    };
    Sidebar.prototype.render = function () {
        var _this = this;
        var _a = this.props, width = _a.width, groupHeights = _a.groupHeights, height = _a.height, isRightSidebar = _a.isRightSidebar;
        var _b = this.props.keys, groupIdKey = _b.groupIdKey, groupTitleKey = _b.groupTitleKey, groupRightTitleKey = _b.groupRightTitleKey;
        var sidebarStyle = {
            width: width + "px",
            height: height + "px"
        };
        var groupsStyle = {
            width: width + "px"
        };
        var groupLines = this.props.groups.map(function (group, index) {
            var elementStyle = {
                height: groupHeights[index] + "px",
                lineHeight: groupHeights[index] + "px"
            };
            return ((0, jsx_runtime_1.jsx)("div", __assign({ "data-testid": "sidebar", className: 'rct-sidebar-row rct-sidebar-row-' + (index % 2 === 0 ? 'even' : 'odd'), style: elementStyle }, { children: _this.renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey) }), (0, generic_1._get)(group, groupIdKey)));
        });
        return ((0, jsx_runtime_1.jsx)("div", __assign({ className: 'rct-sidebar' + (isRightSidebar ? ' rct-sidebar-right' : ''), style: sidebarStyle }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: groupsStyle }, { children: groupLines }), void 0) }), void 0));
    };
    Sidebar.propTypes = {
        groups: prop_types_1.default.oneOfType([prop_types_1.default.array, prop_types_1.default.object]).isRequired,
        width: prop_types_1.default.number.isRequired,
        height: prop_types_1.default.number.isRequired,
        groupHeights: prop_types_1.default.array.isRequired,
        keys: prop_types_1.default.object.isRequired,
        groupRenderer: prop_types_1.default.func,
        isRightSidebar: prop_types_1.default.bool,
    };
    return Sidebar;
}(react_1.Component));
exports.default = Sidebar;
