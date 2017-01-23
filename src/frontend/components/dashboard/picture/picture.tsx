import * as React from "react";
import * as Dimensions from "react-dimensions";
declare let require: any;
let styles = require("./picture.pcss");
interface PictureProps {
    image: string;

}
export default class Picture extends React.Component<PictureProps, any> {

    render() {
        return (<div className={styles.sideBar} >
            <img className={styles.image} src={this.props.image} alt=""/>
        </div>);
    }
}


let ss = Dimensions({elementResize: true, className: "react-dimensions-wrapper"})(Picture);

