import React from 'react'; 
import SearchBar from './SearchBar'; 
import SearchBarMobile from './SearchBarMobile';
import SearchResults from './SearchResults';
import SearchResultsMobile from './SearchResultsMobile'; 
import Playlist from './Playlist'; 
import PlaylistBar from './PlaylistBar';
import Spotify from './Spotify'; 


class AppContentsFullEnglish extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            searchResults: [],
            playlistName: "El nombre de mi lista de reproducción", 
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
                            <strong>Busca</strong> sus canciones favoritos en Spotify<span>*</span><br></br>
                            y agréguelos a una nueva lista de reproducción.
                            </p>
                        
                        <p className="isMobileWide">
                            <strong>Busca</strong> sus canciones favoritos en Spotify<span>*</span> y agréguelos a una nueva lista de reproducción. 
                        </p>

                        <p className="isTablet espanolResize">
                            <strong>Busca</strong> sus canciones favoritos en Spotify<span>*</span> y 
                            agréguelos a una nueva lista de reproducción.
                        </p>

                        <p className="isHighRes espanolResize">
                            <strong>Busca</strong> sus canciones favoritos en Spotify<span>*</span> y agréguelos a una nueva lista de reproducción.
                        </p>
                    </div>
                </div>

                <div className="App">
                <SearchBar placeholder="Busca una canción, un álbum o artista" buttonText="Busca" onSearch={this.search} />
                <div className="srWindow">
                    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                    <h3 className="section_title">Resultados</h3>
                </div>
                    <PlaylistBar defaultText="Editar el nombre de la lista de reproducción" onNameChange={this.updatePlaylistName} />
                </div>

                <div className={this.state.isActiveSearchResults ? "isActive" : "isInactive"}>
                    <SearchBarMobile value={this.state.searchedTerm} buttonText="Busca" onSearch={this.search} />
                    <SearchResultsMobile searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                    <h3 className="section_title section_title_mobile">Resultados</h3>
                    <button className="exitBtn" onClick={this.exitSearchResultsPopUp}>Atrás</button>
                </div>

                <div className="viewPL">
                    <button className="mm-btn" onClick={this.openPlaylistPopUp}>Mira lista de reproducción</button>
                </div>

                <div className={this.state.isActivePlaylist ? "plActive" : "plInactive"}>
                    <h2>{this.state.playlistName}</h2>
                    <Playlist playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks} 
                        onRemove={this.removeTrack} 
                        onSave={this.savePlaylist} />
                    <button className="exitBtn" onClick={this.exitPlaylistPopUp}>Atrás</button>
                </div>

                <div className="plWindow">
                    <Playlist playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks} 
                        onRemove={this.removeTrack} 
                        onSave={this.savePlaylist} />
                </div>

                <div className="plbtndiv">
                    <button className="Playlist-save pl-save-btn" onClick={this.props.onSave}>Guardar en Spotify</button>
                </div>    
            </React.Fragment>
        )
    }
}

export default AppContentsFullEnglish; 