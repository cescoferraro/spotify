import {Avatar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {gql} from "apollo-boost";
import {Observer} from "mobx-react";
import React from "react";
import {ChildDataProps, Query} from "react-apollo";
import {Auth} from "../../store/auth_store";
import {ProfileQuery, ProfileQuery_profile} from "../../types/ProfileQuery";
import {SpotifyAuthUrl} from "../home/home";

const profileQuery = gql`
  query ProfileQuery {
    profile {
      name
      email
      images {
        url
      }
    }
  }
`;

function withPhotosLabel({profile}: { profile: ProfileQuery_profile | null | undefined }) {
  const result: { src?: string } = {}
  let images = profile?.images || [];
  const image = images[images.length - 1];
  if (image) result.src = image?.url || "";
  return result;
}

const SpotifyAvatar = ({auth}: { auth: Auth }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <Query
      <ChildDataProps<ProfileQuery>, any>
      query={profileQuery}
    >
      {({data}) => {
        const result = withPhotosLabel({profile: data?.profile});
        return (
          <React.Fragment>
            <Avatar onClick={(event: any) => setAnchorEl(event.currentTarget)} {...result} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => {
                auth.logout()
                setAnchorEl(null)
              }}>Logout</MenuItem>
            </Menu>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export const LeftPart = ({auth}: { auth: Auth }) => {
  console.log(auth)
  return (
    <SpotifyAuthUrl>
      {(url: string) => (
        <Observer>
          {() => (
            auth.access_token !== "initial" ?
              <IconButton
                edge="end" color="inherit" aria-label="open drawer">
                <SpotifyAvatar auth={auth}/>
              </IconButton> :
              <IconButton
                onClick={() => window.location.href = url}
                edge="end" color="inherit" aria-label="open drawer">
                <Avatar/>
              </IconButton>
          )}
        </Observer>
      )}
    </SpotifyAuthUrl>
  );
};
