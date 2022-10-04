import './App.css';
import React from 'react';
import AppContentsNone from './AppContentsNone';
import AppRenderSelection from './AppRenderSelection';

class App extends React.Component {
  constructor(props){
    super(props); 

    this.state = {
      isMobile: window.matchMedia("(max-width: 768px)").matches, 
    }
    this.isMobileCheck = this.isMobileCheck.bind(this); 
  };

  isMobileCheck() {
    this.setState(prevState => ({isMobile: !prevState.isMobile})); 
  }; 

  render() {
    return (
      <React.Fragment onChange={this.isMobileCheck}>
        {this.state.isMobile ? <AppContentsNone /> : <AppRenderSelection />}
      </React.Fragment>
    )
  };
};

export default App;
