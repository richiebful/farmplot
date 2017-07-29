import React from 'react'
import PropertyGroup from './PropertyGroup.jsx'
import Property from './Property.jsx'

class PropertiesSidebar extends React.Component{
        render(){
                let propGroups = []
                this.props.propGroups.forEach((group) => {
                        if (group.type === "group"){
                                propGroups.push(<PropertyGroup
                                        childProps = {group.childProps}
                                />)     
                        }
                        else if (group.type === "singleton"){
                                //consider making SingletonProperty its own class
                                propGroups.push(<Property
                                        singleton={true}
                                        fieldName={group.fieldName}
                                        fieldType={group.fieldType}
                                        fieldData={group.fieldData}
                                        rightButton={group.rightButton}
                                />)
                        }
                })
                return (
                        <div id="props-sidebar" className={this.props.className} hidden={this.props.hidden}>
                                {propGroups}
                        </div>
                )
        }
}

export default PropertiesSidebar;