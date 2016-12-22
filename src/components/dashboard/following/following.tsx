import * as React from "react";
import * as MUI from "muicss/react";
import * as cx from "classnames";

declare let require: any;
let PlaylistStyle = require("./following.pcss");
interface FollowingProps {
    following: {
        items: Array<{
            name: string;
            Followers: {total: number},
            images: Array<{
                url: string
            }>
        }>,
    };
}

export default class Following extends React.Component<FollowingProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        let stylee = {
            height: "70p",
        };
        return (<div>
            <h2>Following</h2>
            <MUI.Divider/>
            {this.props.following.items.map(
                (artist, index) => {
                    return (<div className={cx(PlaylistStyle.flex)} key={index}>

                        <img className={cx("mui--pull-left",PlaylistStyle.photo)} src={artist.images[0].url}
                             alt=""/>


                        <div className={cx(PlaylistStyle.text)}>{artist.name}
                            - Seguidores: {artist.Followers.total}</div>
                    </div>);
                }
            )}
        </div>);
    }
}
