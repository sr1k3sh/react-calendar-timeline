"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var element_resize_detector_1 = __importDefault(require("element-resize-detector"));
function addListener(component) {
    component._erd = (0, element_resize_detector_1.default)({
        strategy: 'scroll'
    });
    component._erdWidth = component.container.offsetWidth;
    component._erd.listenTo(component.container, function (element) {
        var width = element.offsetWidth;
        if (component._erdWidth !== width) {
            component.resize(component.props);
            component._erdWidth = width;
        }
    });
}
function removeListener(component) {
    component._erd.removeAllListeners(component.container);
}
exports.default = { addListener: addListener, removeListener: removeListener };
