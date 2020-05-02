/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileQuery
// ====================================================

export interface ProfileQuery_profile_images {
  __typename: "Image";
  url: string | null;
}

export interface ProfileQuery_profile {
  __typename: "Profile";
  name: string | null;
  email: string | null;
  images: (ProfileQuery_profile_images | null)[] | null;
}

export interface ProfileQuery {
  profile: ProfileQuery_profile | null;
}
