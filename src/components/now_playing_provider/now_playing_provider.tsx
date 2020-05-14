import {useQuery} from "@apollo/react-hooks";
import {ReactElement, useEffect, useReducer, useState} from "react";
import {notEmpty} from "../../shared/typescript";
import {Player} from "../../store/player_store";
import {NowPlayingQuery, NowPlayingQuery_myDevices} from "../../types/NowPlayingQuery";
import {nowquery2} from "./query";

interface ChildrenParams {
  devices: any[]
  uri: string
  loading: boolean
  duration: number
  progress: number
  device: string
  refetch: () => void
  artists: string
  playing: boolean
  title: string
}

const initial = {
  count: 0
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

export const SpotifyPLayerProvider = ({children}: {
  player: Player,
  children: (props: ChildrenParams) => ReactElement | null
}) => {

  const {data, loading, refetch} = useQuery<NowPlayingQuery>(nowquery2, {pollInterval: 5000, fetchPolicy: "no-cache"});

  const [state, setState] = useReducer(reducer, initial)
  console.log(state, setState)
  const [device, setDevice] = useState("")
  useEffect(() => {
    const devID = data?.nowPlaying?.device?.id || "";
    if (devID !== "") {
      setDevice(devID)
    }
  }, [data, device, setDevice])

  const initialState: NowPlayingQuery_myDevices[] = [];
  const [devices, setDevices] = useState(initialState)
  useEffect(() => {
    const d = data?.myDevices || []
    if (d.length !== 0) {
      if (d.length !== devices.length) {
        console.log("set devices")
        console.log(devices.length)
        console.log(d.length)
        setDevices(d.filter(notEmpty))
      }
    }
  }, [data, devices, setDevices])

  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    let p = data?.nowPlaying?.CurrentlyPlaying?.is_playing || false;
    if (p !== playing) {
      setPlaying(p)
    }
  }, [data, setPlaying, playing])

  const [title, setTitle] = useState("")
  useEffect(() => {
    const obj = data?.nowPlaying?.CurrentlyPlaying?.Item?.SimpleTrack?.name || "";
    if (obj !== "") setTitle(obj)
  }, [data, setTitle, title])

  const [artists, setArtists] = useState("")
  useEffect(() => {
    let a = data?.nowPlaying?.CurrentlyPlaying?.Item?.SimpleTrack?.artists?.map((t) => t?.name).join(", ") || "";
    if (a !== artists) setArtists(a)
  }, [data, setArtists, artists])

  const [uri, setUri] = useState("")
  useEffect(() => {
    const id = data?.nowPlaying?.CurrentlyPlaying?.Item?.SimpleTrack?.uri || "";
    if (id !== "") setUri(id)
  }, [data, uri, setUri])

  const [duration, setDuration] = useState(0)
  useEffect(() => {
    const id = Math.round((data?.nowPlaying?.CurrentlyPlaying?.Item?.SimpleTrack?.duration_ms || 0) / 1000)
    if (id !== 0) {
      if (id !== duration) {
        setDuration(id)
      }
    }
  }, [data, duration, setDuration])

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const id = Math.round((data?.nowPlaying?.CurrentlyPlaying?.progress_ms || 0) / 1000)
    if (id !== 0) {
      if (id !== progress) {
        setProgress(id)
      }
    }
  }, [data, progress, setProgress])

  let [internal_progress, set_internal_progress] = useState(progress);
  useEffect(() => {
    set_internal_progress(progress)
  }, [progress])
  useEffect(() => {
    if (playing) {
      const timer = setInterval(() => set_internal_progress(internal_progress + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [internal_progress, playing]);

  return children({
    loading,
    progress: internal_progress,
    duration,
    playing,
    devices,
    title,
    artists,
    refetch,
    device,
    uri
  });
}
