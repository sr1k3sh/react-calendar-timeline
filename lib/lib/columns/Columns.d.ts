export default ColumnsWrapper;
declare function ColumnsWrapper({ ...props }: {
    [x: string]: any;
}): JSX.Element;
declare namespace ColumnsWrapper {
    namespace defaultProps {
        const canvasTimeStart: PropTypes.Validator<number>;
        const canvasTimeEnd: PropTypes.Validator<number>;
        const canvasWidth: PropTypes.Validator<number>;
        const lineCount: PropTypes.Validator<number>;
        const minUnit: PropTypes.Validator<string>;
        const timeSteps: PropTypes.Validator<object>;
        const height: PropTypes.Validator<number>;
        const verticalLineClassNamesForTime: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
