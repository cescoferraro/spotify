/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthComponentQuery
// ====================================================

export interface AuthComponentQuery_auth {
  __typename: "Token";
  access_token: string | null;
  refresh_token: string | null;
  token_type: string | null;
  expiry: number | null;
}

export interface AuthComponentQuery {
  auth: AuthComponentQuery_auth | null;
}

export interface AuthComponentQueryVariables {
  code?: string | null;
}
