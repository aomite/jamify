import React from 'react';
import music_girl from '../../images/music_girl.png'; 
import AppContentsFullEspanol from './AppContentsFullEspanol';
import AppContentsFullEnglish from './AppContentsFullEnglish';
import SideMenu from '../SideMenu/SideMenu';

class AppRenderSelection extends React.Component {
  constructor(props){
    super(props); 

    this.state = {
      isEnglish: true,
      defaultSelection: true,
      isBtnOneSel: true,
      isBtnTwoSel: false,
      isBtnThreeSel: true,
      isBtnFourSel: false,
      isBtnFiveSel: false,
      isBtnSixSel: true,
      isBtnSevenSel: false,
    }

    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(e) {
    let nameValue = e.target.name; 
  
    if (nameValue === "btnOne") {
      this.setState({
        isEnglish: true,
        defaultSelection: true,
        isBtnOneSel: true, 
        isBtnTwoSel: false
      }); 
    } else if(nameValue === "btnTwo") {
      this.setState({
        isEnglish: false,
        defaultSelection: false,
        isBtnOneSel: false,
        isBtnTwoSel: true
      }); 
    }
  };

  render() {
    return (
      <div> 
        {this.state.isEnglish ? <AppContentsFullEnglish /> : <AppContentsFullEspanol />}
        <div>
          <SideMenu isEnglish={this.state.isEnglish} 
          isSelected={this.state.defaultSelection} 
          onClick={this.handleClick} 
          isBtnOneSel={this.state.isBtnOneSel} 
          isBtnTwoSel={this.state.isBtnTwoSel}
          />
        </div>
        <img src={music_girl} alt="" />  
      </div>
    )
  };
};

export default AppRenderSelection;
