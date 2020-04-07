import * as React from "react"
import ReduxToastr from "react-redux-toastr"

export const SPOTIFYToastr = (props: any) => {
    return (
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates={true}
            position="top-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar={true}
        />
    )
};
