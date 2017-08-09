import * as React from "react"
import { DashboardComponent } from "./dashboard"
import { MUIProvider } from "../../../shared/components/MUIProvider"

test("Render a User", () => {
    const component = render(
        <MUIProvider>
            <DashboardComponent />
        </MUIProvider>
    )
    expect(component).toMatchSnapshot()
})
