import {Stack} from "./stack.js";
import {Feature} from "./feature.js";
require("./leaflet.js")
require("./leaflet.pm.min.js")

//save geometry on layerGroup and associated data to geoJSON
var saveDrawingObjs = function(layerGroup){
	console.log(layerGroup.toGeoJSON());
	if (drawingObjs == null){
		drawingObjs = layerGroup.toGeoJSON();
	}
}

export function render(mapID, propsDone){
	var drawingObjs = Stack();
	var cropMap = L.map(mapID, {
		center: [37, 58],
		zoom: 3
	});

	L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
	{
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: "richiebful.285bkgie",
		accessToken: "pk.eyJ1IjoicmljaGllYmZ1bCIsImEiOiJjaXRocWNhYXYwMnZrMnhudmc2YmczOWZ2In0.-GYJUA4FymhrHdnzznE4RA"
	}).addTo(cropMap);

	var mGroup = L.featureGroup().addTo(cropMap);
	mGroup.pm.enable();

	cropMap.pm.addControls({
		drawMarker: true,
		drawPolygon: true,
		editPolygon: true,
		drawPolyline: false,
		deleteLayer: true
	});

	//feature creation and removal affects stack properly
	cropMap.on('pm:create', (e) => {
		// alert('pm:create event fired. See console for details');
		drawingObjs.add(Feature({
			layer_id: mGroup,
			leaflet_id: e.layer._leaflet_id
		}));
	});

	mGroup.getLayers().forEach((layer) => {
		layer.on('remove', (e) => {
			drawingObjs.remove(e.target._leaflet_id);
                });
                
                layer.on('click', (e) => {
                        //flesh out getProperties method to search by the proper leaflet_id prop
                        propsDone(drawingObjs.getProperties(e.layer._leaflet_id))
                })
	});
};