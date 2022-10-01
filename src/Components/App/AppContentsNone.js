import React from 'react'; 
import './AppContentsNone.css';

class AppContentsNone extends React.Component {
    render() {
        return (
            <div className="mobile-StandIn">
                <h4 className="mobileH4">Thank you for using Jamify! :D</h4>
                <h4 className="mobileH4">The mobile version of this app is currently in development.
                    Please use the desktop version for access. </h4> 
            </div>
        )
    }
}

export default AppContentsNone; 