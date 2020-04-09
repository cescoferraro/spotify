import {AJAX} from "../../shared/ajax"
import {SuccessToast} from "../../shared/toastr"

export const genericObservable = ({path, toastr = true}: any) =>
    (action: any) => (
        AJAX("/" + path, action.payload.token)
            .map((ajax) => {
                if (toastr) {
                    SuccessToast(path.toUpperCase(), "")
                }
                return ajax
            })
    );
