export default DateProvider;
declare function DateProvider(props: any): JSX.Element;
declare namespace DateProvider {
    namespace propTypes {
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const locale: PropTypes.Validator<object>;
    }
}
import PropTypes from "prop-types";
