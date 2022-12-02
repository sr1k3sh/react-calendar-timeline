import React from 'react';
/* eslint-disable no-console */
var defaultContextState = {
    subscribeToMouseOver: function () {
        console.warn('"subscribeToMouseOver" default func is being used');
    }
};
/* eslint-enable */
var _a = React.createContext(defaultContextState), Consumer = _a.Consumer, Provider = _a.Provider;
export var MarkerCanvasProvider = Provider;
export var MarkerCanvasConsumer = Consumer;
