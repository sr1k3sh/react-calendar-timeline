export default SidebarWrapper;
declare function SidebarWrapper({ children, variant, headerData }: {
    children: any;
    variant: any;
    headerData: any;
}): JSX.Element;
declare namespace SidebarWrapper {
    namespace propTypes {
        const children: PropTypes.Validator<(...args: any[]) => any>;
        const variant: PropTypes.Requireable<string>;
        const headerData: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        export { LEFT_VARIANT as variant };
        export function children_1({ getRootProps }: {
            getRootProps: any;
        }): JSX.Element;
        export { children_1 as children };
    }
    const secretKey: string;
}
import PropTypes from "prop-types";
import { LEFT_VARIANT } from "./constants";
