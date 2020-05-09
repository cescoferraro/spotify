/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyDevicesQuery
// ====================================================

export interface MyDevicesQuery_myDevices {
  __typename: "PlayerDevice";
  name: string | null;
  id: string | null;
  is_active: boolean | null;
}

export interface MyDevicesQuery {
  myDevices: (MyDevicesQuery_myDevices | null)[] | null;
}
