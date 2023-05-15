import React from 'react'; 
import SearchBar from '../SearchBar/SearchBar'; 
import SearchBarMobile from '../SearchBar/SearchBarMobile';
import SearchResults from '../SearchResults/SearchResults';
import SearchResultsMobile from '../SearchResults/SearchResultsMobile'; 
import Playlist from '../Playlist/Playlist'; 
import PlaylistBar from '../Playlist/PlaylistBar';
import Spotify from '../../util/Spotify'; 


class AppContentsFullEnglish extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            searchResults: [],
            playlistName: "Edit Playlist Name", 
            playlistTracks: [], 
            isActiveSearchResults: false,
            isActivePlaylist: false, 
            searchedTerm: ""
        }; 
    
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);  
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this); 
        this.exitSearchResultsPopUp = this.exitSearchResultsPopUp.bind(this); 
        this.exitPlaylistPopUp = this.exitPlaylistPopUp.bind(this); 
        this.openPlaylistPopUp = this.openPlaylistPopUp.bind(this); 
    }

    componentDidMount() {
        Spotify.getAccessToken(); 
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
    
    search(term, event) { 
        Spotify.search(term, event).then(searchResults => {
          return this.setState({
            searchResults: searchResults, 
            searchedTerm: term,
            isActiveSearchResults: true 
            })
        });  
    }

    exitSearchResultsPopUp() {
        return this.setState({isActiveSearchResults: false});
    }

    openPlaylistPopUp() {
        return this.setState({isActivePlaylist: true}); 
    }

    exitPlaylistPopUp() {
        return this.setState({isActivePlaylist: false});
    }

    render() {
        return (
            <React.Fragment>
                <div className="banner">
                    <h1 id="logo">JAMIFY</h1>
                    <div>
                        <p className="isMobile">
                            <strong>Search</strong> your<br></br>favorite songs across Spotify<span>*</span><br></br>
                                and add them to a new playlist.
                            </p>
                        
                        <p className="isMobileWide">
                            <strong>Search</strong> your favorite songs across Spotify<span>*</span>
                                and add them<br></br> to a new playlist.
                        </p>

                        <p className="isTablet">
                            <strong>Search</strong> your favorite songs across Spotify<span>*</span><br></br>
                                and add them to a new playlist.
                        </p>

                        <p className="isHighRes">
                            <strong>Search</strong> your favorite songs across Spotify<span>*</span>
                                and add them to a new playlist.
                        </p>
                    </div>
                </div>

                <div className="App">
                <SearchBar placeholder="Search a song, album, or artist" buttonText="Search" onSearch={this.search} />
                <div className="srWindow">
                    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                    <h3 className="section_title">Results</h3>
                </div>
                    <PlaylistBar defaultText="Edit playlist name" onNameChange={this.updatePlaylistName} />
                </div>

                <div className={this.state.isActiveSearchResults ? "isActive" : "isInactive"}>
                    <SearchBarMobile value={this.state.searchedTerm} buttonText="Search" onSearch={this.search} />
                    <SearchResultsMobile searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                    <h3 className="section_title section_title_mobile">Results</h3>
                    <button className="exitBtn" onClick={this.exitSearchResultsPopUp}>Back</button>
                </div>

                <div className="viewPL">
                    <button className="mm-btn" onClick={this.openPlaylistPopUp}>View playlist</button>
                </div>

                <div className={this.state.isActivePlaylist ? "plActive" : "plInactive"}>
                    <h2>{this.state.playlistName}</h2>
                    <Playlist playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks} 
                        onRemove={this.removeTrack} 
                        onSave={this.savePlaylist} />
                    <button className="exitBtn" onClick={this.exitPlaylistPopUp}>Back</button>
                </div>

                <div className="plWindow">
                    <Playlist playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks} 
                        onRemove={this.removeTrack} 
                        onSave={this.savePlaylist} />
                </div>

                <div>
                    <button className="Playlist-save pl-save-btn" onClick={this.props.onSave}>Save to Spotify</button>
                </div>    
            </React.Fragment>
        )
    }
}

export default AppContentsFullEnglish; 