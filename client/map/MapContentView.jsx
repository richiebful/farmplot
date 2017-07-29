import React from 'react'
import PropertiesSidebar from './PropertiesSidebar.jsx'
import './MapContentView.css'

class MapContentView extends React.Component {
        constructor(props) {
                super(props)
        }

        render() {
                return (
                        <div id="map-content" className={this.props.className + " column-box"}>
                                <div id="main-map" className="main-column">

                                </div>
                                <PropertiesSidebar
                                        id="sidebar"
                                        className="sidebar-column"
                                        hidden={this.props.sidebarHidden}
                                        propGroups={[{
                                                        title: "Soil type",
                                                        type: "group", 
                                                        childProps: [
                                                                {
                                                                        fieldName: "Clay",
                                                                        fieldType: "text",
                                                                        fieldData: "30%",
                                                                        rightButton: null
                                                                },
                                                                {
                                                                        fieldName: "Silt",
                                                                        fieldType: "text",
                                                                        fieldData: "30%",
                                                                        rightButton: null
                                                                },
                                                                {
                                                                        fieldName: "Sand",
                                                                        fieldType: "text",
                                                                        fieldData: "40%",
                                                                        rightButton: null
                                                                }
                                                        ]
                                                },
                                                { type: "singleton", fieldName: "Crop", fieldType: "text", fieldData: "Rye", rightButton: null }
                                        ]}
                                />
                        </div>
                );
        }
}

export default MapContentView