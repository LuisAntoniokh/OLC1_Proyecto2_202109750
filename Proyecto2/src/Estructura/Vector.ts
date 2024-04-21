export class Vector {
    private values: any[];
    private dimensions: number[];

    constructor(dimensions: number[], values: any[] | any) {
        this.dimensions = dimensions;
        if (Array.isArray(values)) {
            this.values = values;
        } else {
            this.values = this.createArray(dimensions, values);
        }
    }

    private createArray(dimensions: number[], defaultValue: any): any[] {
        if (dimensions.length === 0) {
            return defaultValue;
        } else {
            let dimension = dimensions[0];
            let remainingDimensions = dimensions.slice(1);
            let array = [];
            for (let i = 0; i < dimension; i++) {
                array[i] = this.createArray(remainingDimensions, defaultValue);
            }
            return array;
        }
    }

    public get(indices: number[]): any {
        if (indices.length === 1) {
            return this.values[indices[0]];
        } else if (indices.length === 2) {
            return this.values[indices[0]][indices[1]];
        } else {
            throw new Error("No se soportan más de dos dimensiones");
        }
    }

    set(indices: number[], value: any): void {
        let array = this.values;
        for (let i = 0; i < indices.length - 1; i++) {
            array = array[indices[i]];
        }
        array[indices[indices.length - 1]] = value;
    }

    size(): number[] {
        return this.dimensions;
    }

    toString(): string {
        return JSON.stringify(this.values);
    }
}