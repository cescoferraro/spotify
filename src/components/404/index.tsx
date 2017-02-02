import * as React from "react";

export const NoMatch = ({location}) => {
    return (
        <div>
            Nothing matched {location.pathname}.
        </div>
    );
};
