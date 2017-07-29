import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MapView from './map/MapView.jsx';
import {render as MapRender} from '../assets/js/map.js'

const Index = () => (
  <MuiThemeProvider>
    <MapView
        toolbar = {{viewDropDown: {
                        children: [
                                {primaryText: "Calendar", link: "/calendar"},
                                {primaryText: "Map", link: "/map"},
                                {primaryText: "Inventory", link: "/inventory"}
                        ],
                        currentViewName: "Map"
                   }}}
    />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

MapRender("main-map")
