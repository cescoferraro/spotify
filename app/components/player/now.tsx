import * as React from "react"
import { compose } from "recompose"
import { connect } from "react-redux"
import * as CSS from "./player.css"

const SongTitle = ({ now }) => {
    console.log(now.Item.album.images[1].url)
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
const SongImage = ({ now }) => {
    return <img alt="" src={now.Item.album.images[1].url} />
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
                    <div className={CSS.image} >
                        {now.is_playing ? <SongImage now={now} /> : <img alt="" src="http://gavinsmith.ca/lj/live_blank.png" />}
                    </div>
                    {now.is_playing ? <SongTitle now={now} /> : <p>Not Playing</p>}
                </div>
            </div>
        )
    }
    public componentWillMount() {
        /* this.fetch()*/
    }
    private fetch() {
        this.props.dispatch({ type: "NOW", payload: { token: this.props.token } })
    }
}
export const NOW = compose(connect(({ token, player }) => ({ token, player })))(NOWClass)
