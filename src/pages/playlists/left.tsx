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

const withPhotosLabel = ({profile}: { profile: ProfileQuery_profile | null | undefined }) => {
  const result: { src?: string } = {}
  let images = profile?.images || [];
  const image = images[images.length - 1];
  if (image) result.src = image?.url || "";
  return result;
};

const SpotifyAvatar = ({auth}: { auth: Auth }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <IconButton edge="end" color="inherit" aria-label="open drawer">
      <Query<ChildDataProps<ProfileQuery>, any> query={profileQuery}>
        {({data}) => {
          const result = withPhotosLabel({profile: data?.profile});
          return (
            <React.Fragment>
              <Avatar onClick={(event: any) => setAnchorEl(event.currentTarget)} {...result} />
              <Menu
                anchorEl={anchorEl}
                keepMounted={true}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem
                  onClick={() => {
                    auth.logout()
                    setAnchorEl(null)
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          );
        }}
      </Query>

    </IconButton>
  );
};

const LogoutAvatar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <SpotifyAuthUrl>
      {(url: string) => (
        <IconButton
          edge="end" color="inherit" aria-label="open drawer">
          <React.Fragment>
            <Avatar onClick={(event: any) => setAnchorEl(event.currentTarget)}/>
            <Menu
              keepMounted={true}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => window.location.href = url}>Conectar</MenuItem>
            </Menu>
          </React.Fragment>
        </IconButton>
      )}
    </SpotifyAuthUrl>
  )
};

export const LoginAvatar = ({auth}: { auth: Auth }) => {
  return (
    <Observer>
      {() => (auth.access_token !== "initial" ? <SpotifyAvatar auth={auth}/> : <LogoutAvatar/>)}
    </Observer>
  );
};
