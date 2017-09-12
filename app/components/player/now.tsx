import * as React from "react"
import { compose } from "recompose"
import { connect } from "react-redux"
import * as CSS from "./player.css"
import { PLAYER_STATUS } from "../../../store/constants";

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
        const { player } = this.props
        return (
            <div className={CSS.now}>
                <div onClick={this.fetch}>
                    <div className={CSS.image} >
                        {player.is_playing ? <SongImage now={player} /> : <img alt="" src="http://gavinsmith.ca/lj/live_blank.png" />}
                    </div>
                    {player.is_playing ? <SongTitle now={player} /> : <p>Not Playing</p>}
                </div>
            </div>
        )
    }
    public componentWillMount() {
        /* this.fetch()*/
    }
    private fetch() {
        this.props.DISPATCH(PLAYER_STATUS, { token: this.props.token })
    }
}
export const CurrentSong = compose(connect(({ token, player }) => ({ token, player })))(NOWClass)
