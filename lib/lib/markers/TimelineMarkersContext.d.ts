export class TimelineMarkersProvider extends React.Component<any, any, any> {
    static propTypes: {
        children: PropTypes.Validator<PropTypes.ReactElementLike>;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    handleSubscribeToMarker: (newMarker: any) => {
        unsubscribe: () => void;
        getMarker: () => any;
    };
    handleUpdateMarker: (updateMarker: any) => void;
}
export const TimelineMarkersConsumer: React.Consumer<{
    markers: never[];
    subscribeMarker: () => typeof noop;
}>;
import React from "react";
import PropTypes from "prop-types";
import { noop } from "../utility/generic";
