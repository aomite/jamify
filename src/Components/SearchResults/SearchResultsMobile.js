import React from 'react'; 
import TrackList from '../TrackList/TrackList'; 

class SearchResultsMobile extends React.Component{
    render() {
        return (
            <div className="SearchResultsMobile">
                <TrackList 
                tracks={this.props.searchResults} 
                onAdd={this.props.onAdd} 
                isRemoval={false} />
            </div>
        ); 
    }
} 

export default SearchResultsMobile; 