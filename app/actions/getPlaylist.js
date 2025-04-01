"use server";

export async function getPlaylist(token) {
    const result = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    const auth_dat = await result.json();

    return auth_dat;
}