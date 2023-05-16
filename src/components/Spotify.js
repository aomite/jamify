// const clientId = `${process.env.REACT_APP_API_KEY_V2}`;
// const redirectUri = "https://jamifyv2.netlify.app";

const clientId = "8a00cf997bbe4e2e8c11a96b6399d7ef"; 
const redirectUri = "http://localhost:3000"; 
let accessToken; 

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }

        // Checks accessToken match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]); 

            //Clears the parameters and grabs a new access token upon expire
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken; 
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessURL; 
        }
    }, 

    search(term) {
        const accessToken = Spotify.getAccessToken(); 

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { 
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then(response => {
            return response.json(); 
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id, 
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name, 
                uri: track.uri
            })); 
        });
    }, 

    savePlaylist(name, trackUris) {
        if(!name || !trackUris.length){
            return Promise.reject(); 
        }  

        const accessToken = Spotify.getAccessToken(); 
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId; 

        return fetch(`https://api.spotify.com/v1/me`, { 
            headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id; 
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: name })
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id; 
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: headers, 
                    method: "POST", 
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })
    }
}



export default Spotify; 