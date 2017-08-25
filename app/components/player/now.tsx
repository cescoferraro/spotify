import * as React from "react"
import { compose } from "recompose"
import { connect } from "react-redux"
import * as CSS from "./main.css"

const SongTitle = ({ now }) => {
    const hey = now.Item.artists.map(
        (artist, index) => (
            <a key={Math.random()}>
                {artist.name}
                {now.Item.artists.length - 1 !== index ? " & " : (" - " + now.Item.name)}
            </a>
        )
    )
    return <p>{hey}</p>
}

class NOWClass extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.fetch = this.fetch.bind(this)
    }
    public render() {
        const { now } = this.props.player
        return (
            <div className={CSS.now}>
                <div onClick={this.fetch}>
                    {now.is_playing ? <SongTitle now={now} /> : <p>Not Playing</p>}
                </div>
            </div>
        )
    }
    public componentWillMount() {
        this.fetch()
    }
    private fetch() {
        this.props.dispatch({ type: "NOW", payload: { token: this.props.token } })
    }
}
export const NOW = compose(connect(({ token, player }) => ({ token, player })))(NOWClass)
