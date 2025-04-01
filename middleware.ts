import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers';

var spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID || ''
var spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || ''
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT ||''

function generateCodeVerifier(length: number) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/login')) {

    const state = generateCodeVerifier(16);

    const params = new URLSearchParams();
    params.append("client_id", spotify_client_id);
    params.append("response_type", "code");
    params.append("redirect_uri", `${API_ENDPOINT}/callback`);
    params.append("scope", "streaming user-read-private user-read-email playlist-read-private user-modify-playback-state");
    params.append("state", state);
    return (NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`));
  }

  if (request.nextUrl.pathname.startsWith('/logout')) {

    const response = NextResponse.redirect(`${API_ENDPOINT}`);

    // Get all cookies
    const cookies = request.cookies.getAll();

    // Delete each cookie
    for (const cookie of cookies) {
      response.cookies.delete(cookie.name);
    }

    return response;
  }


  if (request.nextUrl.pathname.startsWith('/callback')) {
    const { searchParams } = new URL(request.url);
    // Read a query parameter
    const code = searchParams.get('code') || '';

    const result = await fetch('https://accounts.spotify.com/api/token', {
      body: new URLSearchParams({
        grant_type: "authorization_code",
        redirect_uri: `${API_ENDPOINT}/callback`,
        code: code,
      }),
      method: "POST",
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      }

    });

    const auth_dat = await result.json();

    const cookiesList = cookies();
    
    const response = NextResponse.redirect(`${API_ENDPOINT}`)
    
   
    response.cookies.set({
      name: 'refreshToken',
      value: auth_dat.refresh_token,
      path: '/',
      maxAge: 60 * 60 * 24 * 365 * 10,
    })

    return response
  };


}