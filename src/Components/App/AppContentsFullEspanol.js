import React from 'react'; 
import SearchBar from '../SearchBar/SearchBar'; 
import SearchResults from '../SearchResults/SearchResults'; 
import Playlist from '../Playlist/Playlist'; 
import PlaylistBar from '../Playlist/PlaylistBar';
import music_girl from '../../images/music_girl.png'; 
import Spotify from '../../util/Spotify'; 

class AppContentsFullEspanol extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            searchResults: [],
            playlistName: "My Playlist", 
            playlistTracks: [],
        }; 
    
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);  
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this); 
    }
    
    componentDidMount() {
        window.addEventListener('load', () => {Spotify.getAccessToken()});
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
                <p>Busca sus canciones favoritos en Spotify<span>*</span> y agréguelos a una nueva lista de reproducción.</p>
                </div>

                <div className="App">
                <SearchBar placeholder="Busca una canción, un álbum o artista" buttonText="Busca" onSearch={this.search} />
                <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                    <h3 className="section_title" style={{padding: '1rem 11.77rem'}}>Resultados</h3>
                    <PlaylistBar inputWidth='126%' inputPosition='relative' inputRight='1.2rem' defaultText="Nombra lista de reproducción" onNameChange={this.updatePlaylistName} />
                    <Playlist playlistName={this.state.playlistName}
                    playlistTracks={this.state.playlistTracks} 
                    onRemove={this.removeTrack} 
                    onSave={this.savePlaylist} />
                    <button className="Playlist-save" onClick={this.props.onSave}>Guardar en Spotify</button> 
                </div>
                </div>

                <div className="Notes">
                    <p style={{padding: '2.6rem 5.65rem 0.5rem'}}>*Se requiere cuenta de Spotify</p>
                    <p>Versión 0.5.0</p>
                </div>

                <img src={music_girl} alt="" />      
            </React.Fragment>
        )
    }
}

export default AppContentsFullEspanol; 