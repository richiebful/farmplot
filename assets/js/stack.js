import { Feature, JSONFeature } from "./feature.js";

export function Stack(options) {
    return Object.assign(Object.create(StackPrototype), options);
}

export function JSONFeatureStack(mapLayer, json) {
    let stack = Stack()
    if (data["features"] == null){
        return null
    }
    data["features"].foreach(function (feature) {
        stack.add(JSONFeature(feature, mapLayer))
    })
    return stack;
}
//potentially replace with call to FileReader API
export function fetchJSON(url, done){
        // Standard XHR to load an image
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'DOMString';
        // When the request loads, check whether it was successful
        request.onload = function () {
            if (request.status === 200) {
                // If successful, resolve the promise by passing back the request response
                done(null, request.response)
            } else {
                // If it fails, reject the promise with a error message
                done(new Error(request.statusText))
            }
        };
        request.onerror = function (err) {
            // Also deal with the case when the entire request fails to begin with
            // This is probably a network error, so reject the promise with an appropriate message
            return done(err)
        };
        // Send the request
        request.send();
}

var StackPrototype = {
    add: function add(item) {
        this.stack.push(item);
        this.count++;
    },
    setProperty: function setProperty(item, key, value) {
        let foundIndex = this.stack.find(item.equals, item);
        if (foundIndex == undefined) {
            return false;
        }
        else {
            return this.stack[foundIndex].setProperty(key, value);
        }
    },
    remove: function remove(item) {
        let foundIndex = this.stack.find(item.equals, item);
        if (foundIndex == undefined) {
            return false;
        }
        else if (foundIndex < this.stack.length - 1) {
            let retVal = this.stack[i];
            this.stack[i] = this.stack.pop();
            this.count--;
            return retVal;
        }
        else {
            this.count--;
            return this.stack.pop();
        }
    },
    removeProperty: function removeProperty(item, key, value) {
        let foundIndex = this.stack.find(Feature.equals, item);
        if (foundIndex == undefined) {
            return false;
        }
        else {
            return this.stack[foundIndex].removeProperty(key);
        }
    },
    size: function size() {
        return count;
    },
    toFile: function toFile(){

    },
    outputArray: function outputArray() {
        return Array(this.stack);
    },
    stack: [],
    count: 0
}   