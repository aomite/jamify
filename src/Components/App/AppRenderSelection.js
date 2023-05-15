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
      isSideMenuActive: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.openSettingsPopUp = this.openSettingsPopUp.bind(this); 
    this.exitSettingsPopUp = this.exitSettingsPopUp.bind(this); 
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

  openSettingsPopUp() {
    return this.setState({isSideMenuActive: true}); 
}

  exitSettingsPopUp() {
      return this.setState({isSideMenuActive: false});
  }

  render() {
    return (
      <div> 
        {this.state.isEnglish ? <AppContentsFullEnglish /> : <AppContentsFullEspanol />}
        <div className="viewSts"> 
          <button className="mm-btn" onClick={this.openSettingsPopUp}>{this.state.isEnglish ? "Settings" : "Adjustes"}</button> 
        </div>
        <div className={this.state.isSideMenuActive ? "sideMenu-parent sideMenuActive" : "sideMenu-parent sideMenuInactive"}>
          <SideMenu isEnglish={this.state.isEnglish} 
            isSelected={this.state.defaultSelection} 
            onClick={this.handleClick} 
            isBtnOneSel={this.state.isBtnOneSel} 
            isBtnTwoSel={this.state.isBtnTwoSel}
            isBtnThreeSel={this.state.isBtnThreeSel} />
          <button className="exitBtn" onClick={this.exitSettingsPopUp}>{this.state.isEnglish ? "Back" : "Atrás"}</button> 
        </div>
        <img id="tempIgnore" src={music_girl} alt="" />  
      </div>
    )
  };
};

export default AppRenderSelection;
