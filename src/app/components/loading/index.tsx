import * as React from "react"
import MDSpinner from "react-md-spinner"
import * as CSS from "./loading.css"

export const LOADING = ({userAgent}: any) => {
    return (
        <div className={CSS.container}>
            <MDSpinner
                className={CSS.main}
                // userAgent={userAgent as any}
                singleColor="#00ff00"
            />
        </div>
    )
};
