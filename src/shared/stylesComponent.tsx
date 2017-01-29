import * as React from "react";


export default class WithStylesContext extends React.Component <any, any> {
    static propTypes = {
        children: React.PropTypes.element.isRequired,
        onInsertCss: React.PropTypes.func.isRequired,
    };

    static childContextTypes = {
        insertCss: React.PropTypes.func.isRequired,
    };

    getChildContext() {
        return {insertCss: this.props.onInsertCss};
    }

    render() {
        return React.Children.only(this.props.children);
    }
}


