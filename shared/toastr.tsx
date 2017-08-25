import { toastr as toastrFactory } from "react-redux-toastr"

export const SuccessToast = (title, description) => {
    toastrFactory.success(title.toUpperCase(), description, {
        position: "bottom-center"
    })
}

export const WarningToast = () => {
    toastrFactory.warning(
        "Login Again!".toUpperCase(),
        "Your token expired or you do not have any active spotify clients!",
        {
            position: "bottom-center"
        }
    )
}
