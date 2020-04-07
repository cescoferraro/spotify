import * as React from "react"

export const Scripter = ({rules, async, id}: any) => {
    return (
        <script
            dangerouslySetInnerHTML={{__html: rules}}
            id={id}
            async={async}
        />)
};
