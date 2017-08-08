import { redirect } from 'redux-first-router'

export const routesMap = {
    HOME: { path: "/" },
    DASHBOARD: { path: "/dashboard" },
    AUTH: {
        path: "/auth/:code", thunk: (dispatch, getState) => {
            console.log(getState())
            const action = redirect(
                {
                    type: 'DASHBOARD',
                    payload: {
                        code: getState().location.payload.code
                    }
                })
            dispatch(action)
        },
    }
}
