
export const app = (state = {
    progress: true,

}, action: any = {}) => {
    switch (action.type) {
        case "TOOGLE_PROGRESS_BAR":
            return { ...state, progress: !state.progress }
        default:
            return state
    }
}
