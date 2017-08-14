import * as React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import * as CSS from "./main.css"

const SongTitle = ({ now }) => {
    return (
        <p>{now.Item.artists.map(
            (artist, index) => {
                return (
                    <a key={Math.random()}>
                        {artist.name}
                        {now.Item.artists.length - 1 !== index ?
                            " & " : (" - " + now.Item.name)}
                    </a>)
            }
        )}
        </p>)
}

class NOWClass extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.fetch = this.fetch.bind(this)
    }
    fetch() {

        this.props.dispatch({ type: "NOW", payload: { token: this.props.token } })
    }
    componentWillMount() {
        this.fetch()
    }
    render() {
        console.log(this.props)
        const { now } = this.props.player
        const { Item } = now
        return (<div className={CSS.now}>
            <div>
                {now.is_playing ?
                    <SongTitle now={now} /> : <p>Not Playing</p>}
            </div>
        </div>)
    }
}
export const NOW = compose(connect(({ token, player }) => ({ token, player })))(NOWClass)
