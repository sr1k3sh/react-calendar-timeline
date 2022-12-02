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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
export var defaultItemRenderer = function (_a) {
    var item = _a.item, itemContext = _a.itemContext, getItemProps = _a.getItemProps, getResizeProps = _a.getResizeProps;
    var _b = getResizeProps(), leftResizeProps = _b.left, rightResizeProps = _b.right;
    return (_jsxs("div", __assign({}, getItemProps(item.itemProps), { children: [itemContext.useResizeHandle ? _jsx("div", __assign({}, leftResizeProps), void 0) : '', _jsx("div", __assign({ className: "rct-item-content", style: { maxHeight: "" + itemContext.dimensions.height } }, { children: itemContext.title }), void 0), itemContext.useResizeHandle ? _jsx("div", __assign({}, rightResizeProps), void 0) : ''] }), void 0));
};
// TODO: update this to actual prop types. Too much to change before release
// future me, forgive me.
defaultItemRenderer.propTypes = {
    item: PropTypes.any,
    itemContext: PropTypes.any,
    getItemProps: PropTypes.any,
    getResizeProps: PropTypes.any
};
