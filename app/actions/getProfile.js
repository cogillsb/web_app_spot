"use server";

export async function getProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }}); 

    if (!result.ok){
        return "bad_token";
        }
    const auth_dat = await result.json();
    

    return auth_dat;
}