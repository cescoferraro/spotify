import * as React from 'react'

export default class RadiumProvider extends React.Component<any, any> {
    static childContextTypes = {
        _radiumConfig: React.PropTypes.object
    };

    getChildContext() {
        const {radiumConfig} = this.props;
        return {_radiumConfig: radiumConfig}
    }

    render() {
        const {children} = this.props;
        return React.cloneElement(children, {
            ...this.props,
        })
    }
}

