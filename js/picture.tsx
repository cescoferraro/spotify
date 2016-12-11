import { Row } from "muicss/react";
import * as React from "react";

interface PictureProps {
    image: string

}
export default class Picture extends React.Component<PictureProps,any> {

    render() {
        let divStyle = {
            height: '300px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: 'url(' + this.props.image + ')'
        };
        return <Row style={divStyle}> </Row>
    }
}
