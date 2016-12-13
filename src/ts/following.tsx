import * as React from "react";
import * as MUI from "muicss/react";


interface FollowingProps {
    following: {
        items: Array<{name: string;Followers: {total: number},images: Array<{url: string}>}>,
    }
}

export default class Following extends React.Component<FollowingProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        let stylee = {
            height: '70px',
        };
        return <div>
            <h2>Following</h2>
            <MUI.Divider/>
            {this.props.following.items.map(
                (artist, index) => {
                    return <MUI.Row key={index}>
                        <MUI.Col md="2">
                            <img className="mui--pull-right" style={stylee} src={artist.images[0].url}
                                 alt=""/>
                        </MUI.Col>
                        <MUI.Col md="10" style={stylee}>
                            <table style={stylee} width="100%">
                                <tbody>
                                <tr style={{height: '50px'}}>
                                    <td className="mui--align-middle">{artist.name} -
                                        Seguidores: {artist.Followers.total}</td>
                                </tr>
                                </tbody>
                            </table>
                        </MUI.Col>
                    </MUI.Row>
                }
            )}
        </div>
    }
}