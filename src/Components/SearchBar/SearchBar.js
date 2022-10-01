import React from 'react';
import './SearchBar.css';  


class SearchBar extends React.Component {
    constructor(props){
        super(props); 

        this.state = {
            term: ""
        }

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this); 
        this.isEnter = this.isEnter.bind(this); 
    }
    
    search() {
        this.props.onSearch(this.state.term); 
    }

    isEnter(event) { 
        let pressedKey = event.key; 
        if (pressedKey === 'Enter') {
            this.search();
        } 
    }

    handleTermChange(event) {
        this.setState({ term: event.target.value }); 
    }

    render() {
    return (
        <div className="SearchBar" >
            <input placeholder={this.props.placeholder} onChange={this.handleTermChange} onKeyDown={this.isEnter} />
            <button className="SearchButton" onClick={this.search}>{this.props.buttonText}</button>
        </div>
    )   
    }
}

export default SearchBar; 