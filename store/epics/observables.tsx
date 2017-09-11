import { SuccessToast } from "../../shared/toastr"
import { AJAX } from "../../shared/ajax"

export const genericObservable = ({ path, toastr = true }) =>
    (action) => {
        return (
            AJAX("/" + path, action.payload.token)
                .map((ajax) => {
                    /* if (toastr) { SuccessToast(path.toUpperCase(), "") }*/
                    return ajax
                })
        )
    }
