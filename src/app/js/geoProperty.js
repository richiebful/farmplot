export function GeoTemporalProperty(options){
    if (options.units && options.maxvalue && options.minvalue){
        return Object.assign(GeoProperty(options), {
            toString: () => {
                if (this.value && this.units && this.time){
                    return value + " " + units + " at " + time;
                }
                else{
                    return "";
                }
            },
            getTime: () => {
                return this.time;
            },
            setTime: (newTime) => {
                this.time = newTime;
            },
            time: new Time()
        });
    }
    else{
        return null;
    }
};

export function GeoProperty(options) {
    if (options.units && options.maxvalue && options.minvalue){
        return Object.assign(Object.create(GeoPropertyPrototype), options);
    }
    else{
        return null;
    }
};

export var DEFAULT_CROP_ROTATION = {
    "seeding rate": GeoTemporalProperty({
        "units": "lbs/acre",
        "minvalue": 0
    }),
    "species": GeoTemporalProperty({
        "units": ""
    }),
    "variety": GeoTemporalProperty({
        "units": "lbs/acre",
        "minvalue": 0
    }),
};

export var DEFAULT_WATER_TEST = {
    "moisture": GeoTemporalProperty({
        "units": "%",
        "minvalue": 0,
        "maxvalue": 100
    }), 
};

export var DEFAULT_SOIL_TEST = {
    "clay": GeoTemporalProperty({
        "units": "%",
        "minvalue": 0,
        "maxvalue": 100
    }),
    "sand": GeoTemporalProperty({
        "units": "%",
        "minvalue": 0,
        "maxvalue": 100
    }),
    "silt": GeoTemporalProperty({
        "units": "%",
        "minvalue": 0,
        "maxvalue": 100
    }),
    "nitrogen (N)": GeoTemporalProperty({
        "units": "lbs N/acre",
        "minvalue": 0
    }),
    "ammonium": GeoTemporalProperty({
        "units": "lbs/acre",
        "minvalue": 0
    }),
    "nitrate": GeoTemporalProperty({
        "units": "lbs/acre",
        "minvalue": 0
    }),
    "potassium (K)": GeoTemporalProperty({
        "units": "ppm",
        "minvalue": 0
    }),
    "phosphorous (P)": GeoTemporalProperty({
        "units": "ppm",
        "minvalue": 0
    }),
    "calcium (Ca)": GeoTemporalProperty({
        "units": "ppm",
        "minvalue": 0
    }),
    "zinc (Zi)": GeoTemporalProperty({
        "units": "ppm",
        "minvalue": 0
    }),
    "copper (Cu)": GeoTemporalProperty({
        "units": "ppm",
        "minvalue": 0
    }),
    "sulfur (S)": GeoTemporalProperty({
        "units": "ppm",
        "minvalue": 0
    }),
    "total carbon": GeoTemporalProperty({
        "units": "lbs/acre",
        "minvalue": 0
    }),
    "total organic carbon": GeoTemporalProperty({
        "units": "%",
        "minvalue": 0,
        "maxvalue": 100
    }),
    "soluble salts": GeoTemporalProperty({
        "units": "millimhos"
    }),
    "pH": GeoTemporalProperty({
        "units": "",
        "minvalue": 0,
        "maxvalue": 14
    }),
    "permanent wilting point": GeoTemporalProperty({
        "units": "",
        "minvalue": 0,
        "maxvalue": 14
    }),
};

var GeoPropertyPrototype = {
    getValue: () => {return value},
    setValue: (newValue) => {this.value = newValue},
    isValue: (attempt) => {
        return (maxvalue >= attempt && minValue <= attempt) || 
               (maxvalue == NaN     && minValue <= attempt) ||
               (maxvalue >= attempt && minvalue == NaN    ) ||
               (maxvalue == NaN     && minvalue == NaN);
    },
    getUnits: () => {return units;},
    setUnits: (newUnits) => {this.units = newUnits;},
    toString: () => {
        if (this.value && this.units && this.time){
            return value + " " + units;
        }
        else{
            return "";
        }
    },
    units: "", //@todo formalize with some library or personally written Unit class
    maxvalue: NaN,
    minvalue: NaN,
    value: NaN
};