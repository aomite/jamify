import React /*, { useState } */ from 'react'; 
import "./PlaylistBar.css"; 

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
        
        if (newVal === "Edit Playlist Name" || newVal === "Nombra lista de reproducción" || newVal === "") {
            this.setState({bgColor: '#ACCEE8'}); 
        } else {
            this.setState({bgColor: '#3D6889'});
        }
    }

    render() {
        return (
            <div className="PlaylistBar" style={{backgroundColor: this.state.bgColor}}>
                <input type="text" ref={this.myRef} className={this.state.style}  
                    defaultValue={this.props.defaultText} style={{width: this.props.inputWidth, position: this.props.inputPosition, right: this.props.inputRight }} onChange={this.handleNameChange}/>
            </div>
        ); 
    }
}

export default PlaylistBar; 