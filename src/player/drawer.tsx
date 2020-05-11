import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {Observer} from "mobx-react";
import * as React from "react";
import {ReactElement, useEffect, useState} from "react";
import {notEmpty} from "../shared/typescript";
import {Player} from "../store/player_store";
import {MyDevicesQuery, MyDevicesQuery_myDevices} from "../types/MyDevicesQuery";

const query = gql` query MyDevicesQuery { myDevices { name id is_active } } `;

interface DeviceProviderChidlrenProps {
  loading: boolean
  device: string
  devices: MyDevicesQuery_myDevices[]
}

interface DeviceProviderProps {
  player: Player
  logged: boolean
  children: (props: DeviceProviderChidlrenProps) => ReactElement
}

export const LoggedFence = ({logged, children}: { logged: boolean, children: () => ReactElement }) => {
  return logged ? children() : null;
}
export const DevicesProvider = ({logged, children}: DeviceProviderProps) => {
  const {data, loading} = useQuery<MyDevicesQuery>(query, {fetchPolicy: "no-cache"});
  const [device, setDevice] = useState("");
  const devices = data?.myDevices?.filter(notEmpty) || []
  useEffect(() => setDevice(devices[0] ? devices[0].id || "" : ""), [devices])
  return (<Observer>{() => children({devices, loading, device})}</Observer>)
}

