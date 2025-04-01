"use server";

var spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID || ''
var spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || ''
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT ||''

export async function setAccessToken(newValue) {

  const result = await fetch('https://accounts.spotify.com/api/token', {
    body: new URLSearchParams({
      grant_type: "refresh_token",
      redirect_uri: `${API_ENDPOINT}/callback`,
      refresh_token: newValue,
    }),
    method: "POST",
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  if (!result.ok){
    return "no_access";
  }

  const auth_dat = await result.json();

  //check with profile call
  const check = await fetch("https://api.spotify.com/v1/me", {
    method: "GET", headers: { Authorization: `Bearer ${auth_dat.access_token}` }}); 

if (!check.ok){
    return "no_access";
    }    

  return auth_dat.access_token;
}

