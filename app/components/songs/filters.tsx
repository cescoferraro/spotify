import * as React from "react"
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
const recentsIcon = (title) =>
    < FontIcon className="material-icons" > {title}</FontIcon>;

const nearbyIcon = <IconLocationOn />;

export class BottomNavigationExampleSimple extends React.Component<any, any> {
    state = { selectedIndex: 0, };

    select = (index) => this.setState({ selectedIndex: index });

    render() {
        return (
            <Paper className={this.props.className} zDepth={1}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Tracks"
                        icon={recentsIcon("Single")}
                        onClick={() => {
                            this.props.genre_action("single")
                            this.select(0)
                        }}
                    />
                    <BottomNavigationItem
                        label="Tracks"
                        icon={recentsIcon("Album")}
                        onClick={() => {
                            this.props.genre_action("album")
                            this.select(1)
                        }}
                    />
                    <BottomNavigationItem
                        label="Tracks"
                        icon={recentsIcon("All")}
                        onClick={() => {
                            this.props.genre_action("")
                            this.select(2)
                        }}
                    />
                </BottomNavigation>
            </Paper>
        );
    }
}

