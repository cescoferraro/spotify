import * as React from "react";
import * as Dimensions from "react-dimensions";
declare let require: any;
let styles = require("./picture.pcss");
interface PictureProps {
    image: string;

}
export default class Picture extends React.Component<PictureProps, any> {

    render() {
        let divStyle = {
            height: "300px",
            width: "auto"
        };
        return (<div className={styles.sideBar} style={divStyle}>
            <img className={styles.image} src={this.props.image} alt=""/>
        </div>);
    }
}


let ss = Dimensions({elementResize: true, className: "react-dimensions-wrapper"})(Picture);

