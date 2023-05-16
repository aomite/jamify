import React /*, { useState } */ from 'react'; 

class PlaylistBar extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            // style: "toggleOff",
            bgColor: '#ACCEE8'
        };
        this.myRef = React.createRef(); 
        this.handleNameChange = this.handleNameChange.bind(this); 
    }


    handleNameChange(event) {
        this.props.onNameChange(event.target.value); 
        let newVal = event.target.value;
        
        if (newVal === "Edit Playlist Name" || newVal === "Nombre tu lista de reproducción" || newVal === "") {
            this.setState({bgColor: '#ACCEE8'}); 
        } else {
            this.setState({bgColor: '#3D6889'});
        }
    }

    render() {
        return (
            <div className="PlaylistBar">
                <input type="text" ref={this.myRef} className={this.state.style} defaultValue={this.props.defaultText} onChange={this.handleNameChange}/>
            </div>
        ); 
    }
}

export default PlaylistBar; 