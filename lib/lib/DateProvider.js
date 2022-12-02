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
import PropTypes from 'prop-types';
import DateContext from './DateContext';
var DateProvider = function (props) {
    var locale = props.locale, children = props.children;
    return (_jsx(DateContext.Provider, __assign({ value: { locale: locale } }, { children: children }), void 0));
};
DateProvider.propTypes = {
    children: PropTypes.node,
    locale: PropTypes.object.isRequired,
};
export default DateProvider;
