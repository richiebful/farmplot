import React from 'react'
import TextInput from 'material-ui/TextInput'

class Property extends React.Component{
        render(){
                //if child.isSingleton is set, enable small edit button on right hand side of text
                let child;
                if (this.props.editEnabled){
                        if (this.props.type === "text"){
                                child = (
                                        <TextInput 

                                        />
                                )
                        }
                        //add more types later
                }
                else{
                        child = (<span class="field-display">
                                        this.props.text
                                 </span>)
                }
                return (
                        <div class="property">
                                <span class="field-name">
                                        {this.props.fieldName}
                                </span>
                                {child}
                        </div>
                )
        }
}

export default Property