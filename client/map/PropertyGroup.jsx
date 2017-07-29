import React from 'react'
import Property from './Property.jsx'

class PropertyGroup extends React.Component{
        render(){
                let properties = []
                this.props.childProps.forEach((property) => {
                                properties.push(<Property
                                        singleton={false}
                                        fieldName={property.fieldName}
                                        fieldType={property.fieldType}
                                        fieldData={property.fieldData}
                                        rightButton={property.rightButton}
                                />)
                })
                return (
                        <div className={this.props.className}>
                                <div className="prop-group-title">
                                        {this.props.title}
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