"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
class Vector {
    constructor(dimensions, values) {
        this.dimensions = dimensions;
        if (Array.isArray(values)) {
            this.values = values;
        }
        else {
            this.values = this.createArray(dimensions, values);
        }
    }
    createArray(dimensions, defaultValue) {
        if (dimensions.length === 0) {
            return defaultValue;
        }
        else {
            let dimension = dimensions[0];
            let remainingDimensions = dimensions.slice(1);
            let array = [];
            for (let i = 0; i < dimension; i++) {
                array[i] = this.createArray(remainingDimensions, defaultValue);
            }
            return array;
        }
    }
    get(indices) {
        if (indices.length === 1) {
            return this.values[indices[0]];
        }
        else if (indices.length === 2) {
            return this.values[indices[0]][indices[1]];
        }
        else {
            throw new Error("No se soportan más de dos dimensiones");
        }
    }
    set(indices, value) {
        let array = this.values;
        for (let i = 0; i < indices.length - 1; i++) {
            array = array[indices[i]];
        }
        array[indices[indices.length - 1]] = value;
    }
    size() {
        return this.dimensions;
    }
    toString() {
        return JSON.stringify(this.values);
    }
}
exports.Vector = Vector;
