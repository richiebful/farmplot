import React from 'react';
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Popover from 'material-ui/Popover'
import { green200, green800 } from 'material-ui/styles/colors'

class MapToolbar extends React.Component {
        constructor(props) {
                super(props)
                this.state = {
                        open: false
                }
        }

        handleTouchTap = (event) => {
                event.preventDefault()
                this.setState({
                        open: true,
                        anchorEl: event.currentTarget
                })
        };

        handleRequestClose = () => {
                this.setState({
                        open: false
                })
        };

        render() {
                let otherViews = []
                this.props.viewDropDown.children.forEach((view) => {
                        if (view.primaryText !== this.props.viewDropDown.currentViewName){
                                otherViews.push(<MenuItem 
                                        primaryText={view.primaryText}
                                        leftIcon={view.leftIcon}
                                />)
                        }
                })
                return (
                        <Toolbar>
                                <ToolbarGroup firstChild={true}>
                                        {/*Dropdown menu for different pages: Calendar, Inventory, Maps
                                           Active page will be displayed as "Farmplot Maps <Logo>"*/}
                                        <RaisedButton
                                                onClick={this.handleTouchTap}
                                                label={this.props.viewDropDown.currentViewName}
                                        />
                                        <Popover
                                                open={this.state.open}
                                                anchorEl={this.state.anchorEl}
                                                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                                                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                                                onRequestClose={this.handleRequestClose}
                                        >
                                                {otherViews}
                                        </Popover>
                                        <FlatButton
                                                className={"glyphicon glyphicon-pencil"}
                                                color={green800}
                                                hover={green200}
                                                label="Edit attributes"
                                                onClick={this.props.edit.onClick}
                                        />
                                </ToolbarGroup>
                        </Toolbar>
                );
        }

}

export default MapToolbar;