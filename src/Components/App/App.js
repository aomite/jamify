import './App.css';
import SearchBar from '../SearchBar/SearchBar'; 
import SearchResults from '../SearchResults/SearchResults'; 
import Playlist from '../Playlist/Playlist'; 
import Spotify from '../../util/Spotify'; 
import React from 'react';

class App extends React.Component {
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
    <div>
      <div className="banner">
        <h1>JAM<span className="highlight">-</span>IFY</h1>
      </div>
      <div className="Notes">
          <p>*Spotify account required</p>
          <p>Version 0.1</p>
      </div>
      <div className="App">
        <div className="Explainer-Text">
          <p>
          Search your favorite songs across Spotify<span>* </span>
          and add them to a new playlist. 
          </p>
        </div>
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack} 
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
        </div>
      </div>
        <div className="img-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="500" height="300" viewBox="0 0 887.506 553.877">
              <g id="Group_1" data-name="Group 1" transform="translate(-976 -230)">
                <path id="Background_Shape" data-name="Background Shape" d="M144.69,172.014C135.682,95.131-347.626-53.261-437.35,19.561s-3.466,209.489,184.564,244.486a688.74,688.74,0,0,0,102.925,10.961C6.517,280.125,152.076,235.057,144.69,172.014Z" transform="translate(1590.036 451.106)" fill="#f2f2f2"/>
                <path id="Background_Shape-2" data-name="Background Shape" d="M.194,146.132C8.513,80.817,454.831-45.247,537.689,16.618S599.574,208.608,425.935,238.34-8.124,211.447.194,146.132Z" transform="translate(1278.959 506.939)" fill="#dde3e9"/>
                <g id="undraw_Imagination" transform="translate(976 230)">
                <ellipse id="Ellipse_1" data-name="Ellipse 1" cx="162.827" cy="8.308" rx="162.827" ry="8.308" transform="translate(0 537.261)" fill="#f2f2f2" />
                <path id="Path_1" data-name="Path 1" d="M806.628,518.77l-27,3.5-1.375.178-35.934,4.659L578.3,548.38c-7.014-4.85-13.634-9.837-19.78-14.943l187.7-11.094,32.466-1.921,1.362-.079Z" transform="translate(-170.859 -182.913)" fill="#e6e6e6" />
                <path id="Path_2" data-name="Path 2" d="M685.254,364.394l-142.61,18.5q6.208-5.28,12.963-10.831Z" transform="translate(-168.585 -160.797)" fill="#e6e6e6" />
                <path id="Path_3" data-name="Path 3" d="M1060.395,498.382q-4.037,6.662-8.686,13.042l-123.9-16.069-68.169-8.844,67.057,3.968Z" transform="translate(-213.999 -178.292)" fill="#e6e6e6" />
                <path id="Path_4" data-name="Path 4" d="M968.675,555.873c-45.606,32.663-106.544,52.608-173.483,52.608-54.753,0-117.684-18.753-169.522-46.014,4.1-10.627,9.811-19.24,17.753-23.6.2-.112.4-.224.605-.322a25.1,25.1,0,0,1,10.949-2.77c46.718-1.316,41.454,51.325,100.017-21.056,36.421-45.014,77.678-60.5,105.88-55.5.52.092,1.033.191,1.546.3,16.345,3.4,28.038,13.858,31.413,29.538,9.212,42.77-17.766,76.987,31.584,66.459A102.071,102.071,0,0,1,968.675,555.873Z" transform="translate(-180.48 -174.253)" fill="#6c63ff" />
                <path id="Path_5" data-name="Path 5" d="M857.065,578.338c-22.951-12.795-37.239-30.263-42.467-51.918-3.882-16.079-2.766-34.172,3.315-53.777a144.031,144.031,0,0,1,20.029-40.457c46.48-65.792,50.675-108.662,46.01-133.04-5.115-26.73-21.735-37.832-21.9-37.94l.717-1.1c.172.111,17.229,11.471,22.467,38.743,3.02,15.723,1.6,33.651-4.223,53.286-7.246,24.437-21.375,51.626-41.995,80.814a142.724,142.724,0,0,0-19.847,40.087c-9.974,32.155-11.385,76.327,38.536,104.157Z" transform="translate(-207.222 -145.856)" fill="#3f3d56" />
                <path id="Path_6" data-name="Path 6" d="M814.481,467.431c-18.094-10.086-17.59-26.071-13.981-37.7a51.121,51.121,0,0,1,7.109-14.361c16.283-23.049,17.755-38.022,16.122-46.524-1.774-9.232-7.463-13.023-7.52-13.06l.717-1.1c.253.164,6.217,4.138,8.095,13.915,2.445,12.731-3.052,28.723-16.339,47.531a49.8,49.8,0,0,0-6.927,13.991c-3.464,11.169-3.958,26.509,13.365,36.166Z" transform="translate(-205.239 -159.405)" fill="#3f3d56" />
                <path id="Path_7" data-name="Path 7" d="M910.315,303.072l-.641-1.15c17.323-9.657,16.83-25,13.365-36.166a49.8,49.8,0,0,0-6.927-13.991c-13.287-18.808-18.785-34.8-16.339-47.531,1.878-9.777,7.842-13.751,8.095-13.915l.718,1.1c-.058.038-5.776,3.878-7.531,13.113-1.615,8.5-.127,23.457,16.132,46.472a51.123,51.123,0,0,1,7.109,14.361C927.905,277,928.409,292.985,910.315,303.072Z" transform="translate(-219.668 -135.858)" fill="#3f3d56" />
                <path id="Path_8" data-name="Path 8" d="M951.2,238.724a19.74,19.74,0,1,1-33.071-21.564l.006-.009c5.957-9.131,35.948-18.973,35.948-18.973S957.155,229.593,951.2,238.724Z" transform="translate(-221.919 -136.984)" fill="#6c63ff" />
                <path id="Path_9" data-name="Path 9" d="M942.75,167.3a19.74,19.74,0,0,1-33.071-21.564l.006-.009c5.957-9.131,35.948-18.973,35.948-18.973S948.707,158.166,942.75,167.3Z" transform="translate(-220.708 -126.752)" fill="#6c63ff" />
                <path id="Path_10" data-name="Path 10" d="M938.922,389.6c-1.263-.3-31.064-7.225-41-2.494a20.4,20.4,0,0,0,8.8,38.816,20.069,20.069,0,0,0,4.409-.487,20.46,20.46,0,0,0,4.33-1.494c9.936-4.738,23.333-32.242,23.9-33.414l.362-.737ZM914.9,422.75A19.081,19.081,0,1,1,898.488,388.3c2.316-1.105,5.856-1.52,9.9-1.52,11.055,0,25.833,3.126,29.426,3.922C935.566,395.2,923.545,418.631,914.9,422.75Z" transform="translate(-217.817 -163.815)" fill="#3f3d56" />
                <path id="Path_11" data-name="Path 11" d="M838.526,252.28a20.316,20.316,0,0,1-13.734-5.316c-8.133-7.416-12.961-37.629-13.163-38.912l-.127-.811.819.052c1.3.083,31.825,2.109,39.958,9.525h0a20.389,20.389,0,0,1-13.753,35.462Zm-25.461-43.613c.842,4.954,5.538,30.874,12.613,37.325a19.082,19.082,0,1,0,25.714-28.2h0c-7.075-6.451-33.317-8.741-38.328-9.124Z" transform="translate(-207.103 -138.283)" fill="#3f3d56" />
                <path id="Path_12" data-name="Path 12" d="M804.348,313.428a19.74,19.74,0,1,1-26.6,29.173c-8.056-7.346-12.956-38.527-12.956-38.527S796.292,306.082,804.348,313.428Z" transform="translate(-200.411 -152.155)" fill="#6c63ff" />
                <path id="Path_13" data-name="Path 13" d="M876.448,314.352a11.285,11.285,0,0,0-10.982-8.89,11.532,11.532,0,0,0-2.408.263c-5.882,1.277-16.338,14.088-16.779,14.627l-.52.638.737.368c.579.29,13.173,6.527,19.766,6.527a7.271,7.271,0,0,0,1.566-.151,11.263,11.263,0,0,0,8.62-13.384Zm-2.645,7.764a9.842,9.842,0,0,1-6.258,4.336c-4.724,1.027-16.608-4.428-19.714-5.909,2.211-2.632,10.778-12.509,15.509-13.535A9.945,9.945,0,0,1,873.8,322.116Z" transform="translate(-212.01 -152.354)" fill="#3f3d56" />
                <path id="Path_14" data-name="Path 14" d="M285.6,499.617l34.39-34.39a9.106,9.106,0,0,1,15.188,3.912h0a9.106,9.106,0,0,1-2.309,8.967L310.91,500.062l30.642,24.425-.016.023c.154-.008.3-.023.46-.023a9.326,9.326,0,1,1-9.324,9.368Z" transform="translate(-131.76 -174.861)" fill="#a0616a" />
                <path id="Path_15" data-name="Path 15" d="M295.651,619.471l10.2-3.808-9.835-41.16-15.056,5.62Z" transform="translate(-40.251 -82.305)" fill="#a0616a" />
                <path id="Path_16" data-name="Path 16" d="M0,0H34.223V13.222H12.754A12.754,12.754,0,0,1,0,.468V0Z" transform="translate(288.811 535.489) rotate(159.528)" fill="#2f2e41" />
                <path id="Path_17" data-name="Path 17" d="M190.985,616.148h10.889l5.181-42H190.983Z" transform="translate(-27.361 -82.254)" fill="#a0616a" />
                <path id="Path_18" data-name="Path 18" d="M0,0H34.223V13.222H12.754A12.754,12.754,0,0,1,0,.468Z" transform="translate(195.511 544.004) rotate(179.997)" fill="#2f2e41" />
                <path id="Path_19" data-name="Path 19" d="M323.959,520.175s26.646-4.441,35.527,6.217l37.748,174.529-21.317,2.665s-7.105-90.6-42.633-114.576c0,0-25.757,79.937-21.316,116.353l-18.652-1.776S287.543,550.373,323.959,520.175Z" transform="translate(-132.817 -182.983)" fill="#2f2e41" />
                <path id="Path_20" data-name="Path 20" d="M388.55,590.1l3.057-4.011-.5-.382,2.061-2.7a6.056,6.056,0,0,0-1.146-8.487h0l-7.414-5.65a6.056,6.056,0,0,0-8.487,1.146h0l-17.5,22.958a6.056,6.056,0,0,0,1.146,8.487h0l7.414,5.65a6.056,6.056,0,0,0,8.487-1.146h0l8.174-10.727.5.382L387.4,591.6l-.5-.382,1.146-1.5Z" transform="translate(-142.044 -189.913)" fill="#e6e6e6" />
                <ellipse id="Ellipse_2" data-name="Ellipse 2" cx="3.152" cy="3.152" rx="3.152" ry="3.152" transform="translate(237.386 386.146)" fill="#fff" />
                <ellipse id="Ellipse_3" data-name="Ellipse 3" cx="21.042" cy="21.042" rx="21.042" ry="21.042" transform="translate(176.549 225.893)" fill="#a0616a" />
                <path id="Path_21" data-name="Path 21" d="M312.551,459.276s19.54-23.093,35.527-4.441h0a63.5,63.5,0,0,1,15.258,43.207l-.6,20.3-36.86-5.773Z" transform="translate(-135.621 -172.712)" fill="#ccc" />
                <path id="Path_22" data-name="Path 22" d="M343.569,454.315a9.561,9.561,0,0,0-9.283,11.261l20.167,111.609-.112.154a9.141,9.141,0,0,0,3.593,13.731h0a9.275,9.275,0,0,0,11.517-3.426,9.1,9.1,0,0,0-1.8-11.872l-.131-.111L353.18,462.672a9.556,9.556,0,0,0-9.484-8.358Z" transform="translate(-138.713 -173.679)" fill="#a0616a" />
                <path id="Path_23" data-name="Path 23" d="M328.568,413.641l9.041-10.651c2.33-2.745,4.767-5.734,5.1-9.32.361-3.93-2.029-7.75-5.3-9.963s-7.281-3.045-11.216-3.351c-7.3-.567-14.977.639-20.977,4.833s-9.924,11.765-8.461,18.937c1.152,5.647,5.4,11.057,3.746,16.58-1.8,6.043-9.207,7.9-15.251,9.7-10.144,3.025-19.83,8.979-25.147,18.132s-5.293,21.775,1.794,29.639c4.589,5.092,11.51,7.666,18.353,8.054S293.9,485.007,300.4,482.8c5.977-2.03,11.89-4.642,16.6-8.849s8.1-10.229,7.949-16.54c-.14-6.014-3.361-11.493-4.685-17.361a28.491,28.491,0,0,1,8.906-27.184" transform="translate(-127.566 -163.065)" fill="#2f2e41" />
                <path id="Path_24" data-name="Path 24" d="M323.387,378.437l5.7-1.118a3.653,3.653,0,0,1,4.288,2.881l7.875,26.425h0l-12.864,2.524h0l-7.875-26.425a3.653,3.653,0,0,1,2.881-4.288Z" transform="translate(-136.751 -162.639)" fill="#6c63ff" />
                <ellipse id="Ellipse_4" data-name="Ellipse 4" cx="10.358" cy="10.358" rx="10.358" ry="10.358" transform="translate(188.809 238.264)" fill="#fff" />
                <ellipse id="Ellipse_5" data-name="Ellipse 5" cx="5.754" cy="5.754" rx="5.754" ry="5.754" transform="translate(193.413 242.868)" fill="#6c63ff" />
              </g>
            </g>
          </svg>
        </div>
    </div>
    );
  }
};

export default App;
