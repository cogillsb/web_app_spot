"use client";
import Image from 'next/image';

function ConnectMessage() {
    return (
<>
<div className="flex w-full  p-4 items-center justify-center">
    <div className="flex flex-col p-4 justify-center items-center space-y-4 border-black border-2 rounded-2xl">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Connecting Your Player
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
            This workout timer acts as a remote for your Spotify player.
            You will need to keep both this tab and your Spotify player open
            while running. To begin, open {" "}
            <a target="_blank"
                href="https://open.spotify.com/" rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-4"
            >
                Spotify
            </a>
            . Then click on the connect to device button (see image below), and select <b>spotworktime</b>.
            A green bar will flash at the bottom of your spotify player indicating a successful connection.
            Once connected the workout timer will launch. Select your playlist, set your reps and how log
            each rep will last, and enjoy your workout!
        </p>
        <Image
            src="/spotify_connect.png"
            width={400}
            height={200}
            alt="Kesho-AI"
        />
    </div>
</div>
</>
    );
}

export default ConnectMessage;

