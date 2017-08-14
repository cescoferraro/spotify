import * as React from "react";
import MDSpinner from "react-md-spinner";
import * as CSS from "./loading.css"

export const LOADING = ({ userAgent }) => {
    return (
        <div className={CSS.container}>
            <MDSpinner
                className={CSS.main}
                userAgent={userAgent} />
        </div>
    )
}
