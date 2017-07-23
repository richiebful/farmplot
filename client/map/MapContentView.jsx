import React from 'react';
import './MapContentView.css'

class MapContentView extends React.Component{
        constructor(props){
                super(props)
        }

        render(){
                return (
                        <div id="map-content" className={this.props.className + " column-box"}>
                                <div id="main-map" className="main-column">

                                </div>
                                <PropertiesSidebar 
                                        id="sidebar" 
                                        className="sidebar-column" 
                                        hidden={this.props.sidebarHidden}
                                />
                        </div>
                );
        }
}

export default MapContentView