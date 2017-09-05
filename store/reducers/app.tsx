
export const app = (state = {
    progress: false
}, action: any = {}) => {
    switch (action.type) {
        case "TOOGLE_PROGRESS_BAR":
            return { ...state, progress: !state.progress }
        default:
            return state
    }
}
