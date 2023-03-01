"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultItemRenderer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var prop_types_1 = __importDefault(require("prop-types"));
var defaultItemRenderer = function (_a) {
    var item = _a.item, itemContext = _a.itemContext, getItemProps = _a.getItemProps, getResizeProps = _a.getResizeProps;
    var _b = getResizeProps(), leftResizeProps = _b.left, rightResizeProps = _b.right;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({}, getItemProps(item.itemProps), { children: [itemContext.useResizeHandle ? (0, jsx_runtime_1.jsx)("div", __assign({}, leftResizeProps), void 0) : '', (0, jsx_runtime_1.jsx)("div", __assign({ className: "rct-item-content", style: { maxHeight: "" + itemContext.dimensions.height } }, { children: itemContext.title }), void 0), itemContext.useResizeHandle ? (0, jsx_runtime_1.jsx)("div", __assign({}, rightResizeProps), void 0) : ''] }), void 0));
};
exports.defaultItemRenderer = defaultItemRenderer;
// TODO: update this to actual prop types. Too much to change before release
// future me, forgive me.
exports.defaultItemRenderer.propTypes = {
    item: prop_types_1.default.any,
    itemContext: prop_types_1.default.any,
    getItemProps: prop_types_1.default.any,
    getResizeProps: prop_types_1.default.any
};
