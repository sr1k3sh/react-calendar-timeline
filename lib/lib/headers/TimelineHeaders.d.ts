export default TimelineHeadersWrapper;
declare function TimelineHeadersWrapper({ children, style, className, calendarHeaderStyle, calendarHeaderClassName }: {
    children: any;
    style: any;
    className: any;
    calendarHeaderStyle: any;
    calendarHeaderClassName: any;
}): JSX.Element;
declare namespace TimelineHeadersWrapper {
    namespace propTypes {
        const style: PropTypes.Requireable<object>;
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const className: PropTypes.Requireable<string>;
        const calendarHeaderStyle: PropTypes.Requireable<object>;
        const calendarHeaderClassName: PropTypes.Requireable<string>;
    }
    const secretKey: string;
}
import PropTypes from "prop-types";
