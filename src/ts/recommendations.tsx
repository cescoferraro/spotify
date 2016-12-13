import * as MUI from "muicss/react";
import * as React from "react";


interface RecommendationsProps {
    recommendation: any
}
export default class Recommendations extends React.Component<RecommendationsProps,any> {


    constructor(props) {
        super(props);
        console.log("Recommendations component");
        this.state = this.props.recommendation;
        console.log(this.state);
        console.log(this.props.recommendation);
    }


    render() {
        console.log(this.props.recommendation);
        return <div>
            <h2>Recommendations:</h2>
            <MUI.Divider/>

            {this.props.recommendation.tracks.map((track, index) => {
                console.log(track);
                if (index <= 5) {
                    return <p key={index}><a href={track.external_urls.spotify}>{track.name}</a></p>
                }
            })}
        </div>
    }
}
