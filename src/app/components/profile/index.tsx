import Subheader from "material-ui/Subheader"
import * as moment from 'moment';
import * as React from "react"
import * as CSS from "./profile.css"

moment.locale("pt-br");

export const INFO = (props: any) => {
    const {user} = props;
    // let s = moment(user.birthdate).format("DD/MM/YYYY");
    const s = "04/13/1999";
    return (
        <div className={CSS.container}>
            <Subheader>Profile</Subheader>
            <div className={CSS.content}>
                <div>
                    <div className={CSS.image}>
                        <img alt="" src={user.images[0].url}/>
                    </div>
                    <div className={CSS.data}>
                        <h2>
                            <a href={user.external_urls.spotify}>
                                {user.display_name}</a>
                        </h2>
                        <h4>Followers: {user.followers.total}</h4>
                        <h4>Birthdate: {s}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
};
