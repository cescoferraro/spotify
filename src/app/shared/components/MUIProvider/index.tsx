import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import * as React from "react"

/* import getMuiTheme from "material-ui/styles/getMuiTheme"*/
/* import { BoilTheme } from "../../theme"*/
/* <MuiThemeProvider muiTheme={getMuiTheme(BoilTheme)}> */

export const MUIProvider = ({children}: any) => (
    < MuiThemeProvider>
        {children}
    </MuiThemeProvider>
);
