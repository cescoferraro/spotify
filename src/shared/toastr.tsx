import {toastr as toastrFactory} from "react-redux-toastr"

export const SuccessToast = (title: string, description: string) => {
    toastrFactory.success(title.toUpperCase(), description, {
        // position: "bottom-center"
    })
};

export const WarningToast = () => {
    toastrFactory.warning(
        "Login Again!".toUpperCase(),
        "Your token expired or you do not have any active spotify clients!",
        {


            // position: "bottom-center"
        }
    )
};

export const OfflineToast = () => {
    toastrFactory.info(
        "You are offline!".toUpperCase(),
        "You do not have internet access. I cannot take you there. It's dangerous!",
        {
            // position: "bottom-center"
        }
    )
};
