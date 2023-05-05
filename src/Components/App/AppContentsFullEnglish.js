import React from 'react'; 
import SearchBar from '../SearchBar/SearchBar'; 
import SearchResults from '../SearchResults/SearchResults'; 
import Playlist from '../Playlist/Playlist'; 
import PlaylistBar from '../Playlist/PlaylistBar';
import Spotify from '../../util/Spotify'; 

class AppContentsFullEnglish extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            searchResults: [],
            playlistName: "My Playlist", 
            playlistTracks: []
        }; 
    
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);  
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this); 
    }
      
    addTrack(track) {
        let tracks = this.state.playlistTracks; 
        if (tracks.find(savedTrack => savedTrack.id === track.id)) {
          return;
    } 
    
    tracks.push(track); 
        this.setState({ playlistTracks: tracks }); 
    }
    
    removeTrack(track) {
        let tracks = this.state.playlistTracks;
        tracks = tracks.filter(currentTrack => currentTrack.id !== track.id); 
        this.setState({ playlistTracks: tracks }); 
    }
    
    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }
    
    savePlaylist() {
        const trackUris = this.state.playlistTracks.map(track => track.uri); 
        Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
          this.setState({
            playlistName: "New Playlist", 
            playlistTracks: []
          })
        })
    }
    
    search(term) {
        Spotify.search(term).then(searchResults => {
          return this.setState({searchResults: searchResults})
        }); 
    }

    render() {
        return (
            <React.Fragment>
                <div className="banner">
                <h1 id="logo">JAMIFY</h1>
                <p>Search your favorite songs across Spotify<span>*</span> and add them to a new playlist.</p>
                </div>

                <div className="App">
                <SearchBar placeholder="Search a song, album, or artist" buttonText="Search" onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                        <h3 className="section_title">Results</h3>
                        <PlaylistBar defaultText="Edit playlist name" onNameChange={this.updatePlaylistName} />
                        <Playlist playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks} 
                            onRemove={this.removeTrack} 
                            onSave={this.savePlaylist} />
                        <button className="Playlist-save" onClick={this.props.onSave}>Save To Spotify</button> 
                    </div>
                </div>

                <div className="Notes">
                    <p>*Spotify account required</p>
                    <p>Version 1.1.0</p>
                </div>    
            </React.Fragment>
        )
    }
}

export default AppContentsFullEnglish; 
