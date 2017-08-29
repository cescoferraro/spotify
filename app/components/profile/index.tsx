import * as React from "react"
import Subheader from "material-ui/Subheader"
import * as CSS from "./profile.css"
import * as moment from 'moment';
moment.locale("pt-br")

export const INFO = ({ payload }) => {
    const { user } = payload
    console.log(moment(user.birthdate))
    return (
        <div className={CSS.container} >
            <Subheader>Profile</Subheader>
            <div className={CSS.content} >
                <div>
                    <div className={CSS.image} >
                        <img alt="" src={user.images[0].url} />
                    </div>
                    <div className={CSS.data} >
                        <h2>
                            <a href={user.external_urls.spotify} >
                                {user.display_name}</a>
                        </h2>
                        <h4>Followers: {user.followers.total}</h4>
                        <h4>Birthdate: {moment(user.birthdate).format("DD/MM/YYYY")}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
