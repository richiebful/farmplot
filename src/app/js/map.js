import {Stack} from "./stack.js";
import {Feature} from "./feature.js";
require("leaflet");
require("leaflet.pm");
require("bootstrap");

//save geometry on layerGroup and associated data to geoJSON
var saveDrawingObjs = function(layerGroup){
	console.log(layerGroup.toGeoJSON());
	if (drawingObjs == null){
		drawingObjs = layerGroup.toGeoJSON();
	}
};

function render(mapID){
	var drawingObjs = Stack();
	var cropMap = L.map(mapID, {
		center: [37, 58],
		zoom: 3
	});

	console.log("map initialized");

	L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
	{
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: "richiebful.285bkgie",
		accessToken: "pk.eyJ1IjoicmljaGllYmZ1bCIsImEiOiJjaXRocWNhYXYwMnZrMnhudmc2YmczOWZ2In0.-GYJUA4FymhrHdnzznE4RA"
	}).addTo(cropMap);

	var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
	var polygon = L.polygon(latlngs, {color: 'blue'});

	var latlngs2 = [[42, -109.03],[41, -102.05],[37, -102.04],[37, -109.05]];
	var polygon2 = L.polygon(latlngs2, {color: 'red'});

	console.log(polygon);
	console.log(polygon2);

	var mGroup = L.featureGroup([polygon, polygon2]).addTo(cropMap);
	mGroup.pm.enable();

	console.log(polygon);

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
		console.log(layer);
		layer.on('remove', (e) => {
			drawingObjs.remove(e.target._leaflet_id);
		});
	});
};

render("main-map");