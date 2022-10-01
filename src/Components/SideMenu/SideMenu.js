import React from 'react'; 
import './SideMenu.css'; 
import '../App/App';

class SideMenu extends React.Component {
    render() {
        return (
            <div className="sideMenu">
                <div>
                    <h4 className="sideMenuTitle">{this.props.isEnglish ? "Settings" : "Adjustes"}</h4>
                </div>
                <div className="divContainer">
                    <div>
                        <h5 className="sidebarTitleSub">{this.props.isEnglish ? "Languages" : "Idiomias"}</h5>
                    </div>
                    <button name="btnOne" className={this.props.isBtnOneSel? "selected" : "unselected"} onClick={this.props.onClick} >English</button>
                    <button name="btnTwo" className={this.props.isBtnTwoSel ? "selected" : "unselected"} onClick={this.props.onClick} >Español</button>
                </div>
                <div className="divContainer unReady">
                    <h5 className="sidebarTitleSub">{this.props.isEnglish ? "Colors" : "Los Colores"}</h5>
                    <button name="btnThree" className={this.props.isBtnThreeSel? "selected" : "unselected"} onClick={this.updateSelection}>Comfy</button>
                    <button name="btnFour" className={this.props.isBtnFourSel ? "selected" : "unselected"} onClick={this.updateSelection}>Royal</button>
                    <button name="btnFive" className={this.props.isBtnFiveSel ? "selected" : "unselected"} onClick={this.updateSelection}>Starry</button>
                </div>
                <div className="divContainer unReady">
                    <h5 className="sidebarTitleSub">{this.props.isEnglish ? "Layouts" : "Diseños"}</h5>
                    <button name="btnSix" className={this.props.isBtnSixSel ? "selected" : "unselected"} onClick={this.updateSelection}>Vertical</button>
                    <button name="btnSeven" className={this.props.isBtnSevenSel ? "selected" : "unselected"} onClick={this.updateSelection}>Hortizontal</button>
                </div>
            </div>
        )
    } 
}

SideMenu.defaultProps = {
    isBtnOneClicked: true,
    isBtnTwoClicked: false, 
    isBtnThreeClicked: true,
    isBtnFourClicked: false,
    isBtnFiveClicked: false,
    isBtnSixClicked: true,
    isBtnSevenClicked: true
};
export default SideMenu; 