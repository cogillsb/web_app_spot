"use server";


export async function setPlayback(token, uri) {

    const data = {
        "context_uri": uri,
        "offset": {
            "position": 0
        },
        "position_ms": 0
    };

    const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        return (true);
    } else {
        return (false);
    }
}



