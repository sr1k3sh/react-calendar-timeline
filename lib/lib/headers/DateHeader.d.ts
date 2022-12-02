export default DateHeaderWrapper;
declare function DateHeaderWrapper({ unit, labelFormat, style, className, intervalRenderer, headerData, height }: {
    unit: any;
    labelFormat: any;
    style: any;
    className: any;
    intervalRenderer: any;
    headerData: any;
    height: any;
}): JSX.Element;
declare namespace DateHeaderWrapper {
    namespace propTypes {
        const style: PropTypes.Requireable<object>;
        const className: PropTypes.Requireable<string>;
        const unit: PropTypes.Requireable<string>;
        const labelFormat: PropTypes.Requireable<string | ((...args: any[]) => any) | {
            [x: string]: {
                [x: string]: string | null | undefined;
            } | null | undefined;
        }>;
        const intervalRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        const headerData: PropTypes.Requireable<object>;
        const height: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        export { formatLabel as labelFormat };
    }
}
import PropTypes from "prop-types";
declare function formatLabel([timeStart, timeEnd]: [any, any], unit: any, labelWidth: any, dateContext: any, formatOptions?: {
    year: {
        long: string;
        mediumLong: string;
        medium: string;
        short: string;
    };
    month: {
        long: string;
        mediumLong: string;
        medium: string;
        short: string;
    };
    week: {
        long: string;
        mediumLong: string;
        medium: string;
        short: string;
    };
    day: {
        long: string;
        mediumLong: string;
        medium: string;
        short: string;
    };
    hour: {
        long: string;
        mediumLong: string;
        medium: string;
        short: string;
    };
    minute: {
        long: string;
        mediumLong: string;
        medium: string;
        short: string;
    };
}): string;
