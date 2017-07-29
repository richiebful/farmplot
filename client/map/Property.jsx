import React from 'react'
import TextField from 'material-ui/TextField'

class Property extends React.Component{
        render(){
                //if child.isSingleton is set, enable small edit button on right hand side of text
                let child;
                if (this.props.editEnabled){
                        if (this.props.fieldType === "text"){
                                child = (
                                        <TextField 

                                        />
                                )
                        }
                        //add more types later
                }
                else{
                        child = (<span className="field-display">
                                        {this.props.fieldData}
                                 </span>)
                }
                return (
                        <div className="property">
                                <span className="field-name">
                                        {this.props.fieldName}
                                </span>
                                {child}
                        </div>
                )
        }
}

export default Property