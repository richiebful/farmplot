import React from 'react'
import PropertyGroup from './PropertyGroup.jsx'
import Property from './Property.jsx'

class PropertiesSidebar extends React.Component{
        render(){
                let propGroups = []
                this.props.propGroups.forEach((group) => {
                        if (group.type === "group"){
                                propGroups.add(<PropertyGroup
                                        
                                />)     
                        }
                        else if (group.type === "singleton"){
                                propGroups.add(<Property
                
                                />)
                        }
                })
                return (
                        <div id="props-sidebar" className={this.props.className}>
                                {propGroups}
                        </div>
                )
        }
}

export default PropertiesSidebar;