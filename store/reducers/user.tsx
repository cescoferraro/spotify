const blankUser = {
    display_name: "dsf",
    followers: { total: 234 },
    external_urls: { spotify: "https://www.google.com/favicon.ico" },
    images: [{ url: "https://www.google.com/favicon.ico" }]
}

export const user = (state = blankUser, action: any = {}) => {
    switch (action.type) {
        case "SET_USER":
            return action.payload
        default:
            return state
    }
}


