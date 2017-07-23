import React from 'react'
import Property from './Property.jsx'

class PropertyGroup extends React.Component{
        render(){
                let properties = []
                this.props.properties.forEach((group) => {
                                properties.add(<Property
                                        
                                />)     
                })
                return (
                        <div className={this.props.className}>
                                <div className="prop-group-title">
                                        {this.props.title.text}
                                        {/*add in button to edit/add props here as well*/}
                                </div>
                                <div className="prop-group-container">
                                        {properties}
                                </div>
                        </div>
                )
        }
}

export default PropertyGroup