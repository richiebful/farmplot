import React from 'react';
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import MapToolbar from './MapToolbar.jsx'
import MapContentView from './MapContentView.jsx'
import "./MapView.css"
import "../../assets/css/leaflet.css"
import "../../assets/css/leaflet.pm.css"

class MapView extends React.Component{
        constructor(props){
                super(props)
                this.state = {
                        editModeEnabled: true
                }
        }

        toggleSidebar = () => {
                this.setState({
                        editModeEnabled: !this.state.editModeEnabled
                })
        }

        render(){
                return (
                        <div id="map-view" className="box">
                                <MapToolbar 
                                        className="header-row"
                                        viewDropDown={this.props.toolbar.viewDropDown}
                                        edit={{
                                                onClick: this.toggleSidebar
                                        }}
                                />
                                <MapContentView
                                        className="main-row"
                                        sidebarHidden={this.state.editModeEnabled}
                                />
                        </div>
                )
        }
}

export default MapView;