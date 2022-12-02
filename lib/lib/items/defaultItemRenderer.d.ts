export function defaultItemRenderer({ item, itemContext, getItemProps, getResizeProps }: {
    item: any;
    itemContext: any;
    getItemProps: any;
    getResizeProps: any;
}): JSX.Element;
export namespace defaultItemRenderer {
    namespace propTypes {
        const item: PropTypes.Requireable<any>;
        const itemContext: PropTypes.Requireable<any>;
        const getItemProps: PropTypes.Requireable<any>;
        const getResizeProps: PropTypes.Requireable<any>;
    }
}
import PropTypes from "prop-types";
