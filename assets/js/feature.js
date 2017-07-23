export function Feature(options){
    return Object.assign(Object.create(FeaturePrototype), options);
};

export function JSONFeature(feature, mapLayer){
    let mapFeature = L.geoJSON(feature).addTo(mapLayer);
    return Feature({
        'leaflet_id': mapFeature._leaflet_id_,
        'properties': feature.properties
    });
}

var FeaturePrototype = {
    getProperties: function getProperties() {return this.properties},
    equals: function equals(other){
        return this.leaflet_id && this.leaflet_id === other.leaflet_id; 
    },
    setProperty: function setProperty(key, value){
        this.properties[key] = value;
        return true;
    },
    removeProperty: function removeProperty(key){
        return delete this.properties[key];
    },
    checkProperty:  function checkProperty(key){
        return this.properties[key];
    },
    leaflet_id: NaN,
    properties: {}
};