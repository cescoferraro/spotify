import * as React from "react";

import Divider from "material-ui/Divider";

interface RecommendationsProps {
    recommendation: any;
}
export default class Recommendations extends React.Component<RecommendationsProps, any> {


    constructor(props) {
        super(props);
        this.state = this.props.recommendation;
    }


    render() {
        return (<div>
            <h2>Recommendations:</h2>
            <Divider/>

            {this.props.recommendation.tracks.map((track, index) => {
                if (index <= 5) {
                    return (<p key={index}><a href={track.external_urls.spotify}>{track.name}</a></p>);
                }
            })}
        </div>);
    }
}
