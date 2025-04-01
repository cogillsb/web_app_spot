import React, { useState, useRef, useEffect } from 'react';
import Counter from './Counter';
import CounterTime from './CounterTime';
import { setUserSettings } from '../actions/userSettings';
import Playlist from './Playlist';
import { Button } from "@/components/ui/button";
import ConnectMessage from './ConnectMessage';
import { Play } from "lucide-react";
import { CircleStop } from "lucide-react";
import { setPlayback } from '../actions/setPlayback';


interface props {
    token: string;
}

type Status = {
    value: string
    label: string
}

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback({ token }: props) {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [timeCounting, setTimeCounting] = useState(false);
    const [player, setPlayer] = useState<Spotify.Player | null>(null);
    const [is_paused, setPaused] = useState(true);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(track);
    const [reps, setReps] = useState(0);
    const [duration, setDuration] = useState(0);
    const [time, setTime] = useState(0);
    const [current_rep, setCRep] = useState(0);
    const [plist, setPlist] = useState({ value: "", label: "" });
    const [running, setRunning] = useState(false);
    const [plybk, setPlybk] = useState(false);


    const handleRepChange = (data: number) => {
        setReps(data);
    };
    const handleDurChange = (data: number) => {
        setDuration(data);
    };

    const handlePlayListChange = (data: Status) => {
        setPlist(data);
    };

    const handlePlayClick = () => {
        if (is_paused) {

            const setPlaylist = async () => {
                const result = await setPlayback(token, plist.value);

                setPlybk(result);
            };

            setPlaylist();

        } else {
            setTimeCounting(false);
            setRunning(false);
            setCRep(0);
            setTime(0);
            clearInterval(intervalRef.current as NodeJS.Timeout);
            if (player !== null) {
                player.togglePlay();
            }
            setPlybk(false)
        }

        const items = {
            'duration': duration,
            'reps': reps,
            'plist_name': plist.label,
            'plist_uri': plist.value,
        };
        setUserSettings(items);
    };


    useEffect(() => {
        if (plybk) {
            setTimeCounting(true);
            setRunning(true);
            setCRep(reps);
            setTime(duration);
        };
    }, [plybk]);

    useEffect(() => {
        if (token && !player) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = () => {
                const player = new window.Spotify.Player({
                    name: 'spotworktime',
                    getOAuthToken: cb => { cb(token); },
                    volume: 0.5
                });
                setPlayer(player);
                player.addListener('player_state_changed', (state => {
                    if (!state) {
                        return;
                    }
                    setTrack(state.track_window.current_track);
                    setPaused(state.paused);
                    setActive(true);                   
                }));
                player.connect();
            };
        };
    }, [token]);

    useEffect(() => {
        if (time == 0 && running) {
            const crep = current_rep - 1

            if (crep > 0) {
                setCRep(crep);
                setTime(duration);
                if (player !== null) {
                    player.nextTrack();
                }

            } else {
                setCRep(0);
                setTimeCounting(false);
                setRunning(false);
                setPlybk(false)
                clearInterval(intervalRef.current as NodeJS.Timeout);
                if (player && !is_paused) {
                    player.togglePlay();
                }
            };
        };
    }, [time]);

    useEffect(() => {
        if (timeCounting) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime > 0 ? prevTime - 1 : prevTime);
            }, 1000);
        };
    }, [timeCounting]);

    if (!is_active) {
        return (
            <ConnectMessage />
        )
    } else {
        return (
            <div className="flex flex-col space-y-2 w-full content-center justify-center">
                <div className="flex flex-row  space-x-8  w-full content-center justify-center border-2 border-black rounded-xl p-2">
                    {(running) && <>
                        <img src={current_track.album.images[0].url} className="now-playing__cover col-span-1 rounded-2xl" alt="" />

                        <div className="now-playing__side col-span-1 flex  flex-col content-center justify-center space-y-2">
                            {(plist) && <div className="now-playing__playlist">Playlist: {plist.label}</div>}
                            <div className="now-playing__name">Song: {current_track.name}</div>
                            <div className="now-playing__artist">Artist: {current_track.artists[0].name}</div>
                            <p>
                                Time left: {`${Math.floor(time / 60)}`.padStart(2, (0).toString())}:{`${time % 60}`.padStart(2, (0).toString())}
                            </p>
                            <p>
                                Reps left: {current_rep}
                            </p>
                        </div>
                    </>
                    }
                </div>

                <div className="flex flex-col p-4 space-y-4 content-center justify-center border-2 border-black bg-blue-100 rounded-xl">
                    <div className="flex flex-row space-x-8 content-center justify-center ">
                        <Counter onStateChange={handleRepChange} disable={running} />
                        <Playlist onStateChange={handlePlayListChange} token={token} disable={running} />
                        <CounterTime onStateChange={handleDurChange} disable={running} />
                    </div>
                    <div className="flex justify-center content-center ">
                        <Button variant="outline" onClick={() => handlePlayClick()}> {is_paused ? <Play /> : <CircleStop />} </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default WebPlayback