"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclaracionVector = void 0;
const Instruccion_1 = require("../Instruccion/Instruccion");
const Simbolo_1 = require("../TablaSimbolos/Simbolo");
const Vector_1 = require("./Vector");
class DeclaracionVector extends Instruccion_1.Instruccion {
    constructor(id, dimensions, defaultValue, tipoDato, line, column) {
        super(line, column);
        this.id = id;
        this.dimensions = dimensions;
        this.defaultValue = defaultValue;
        this.tipoDato = tipoDato;
    }
    interpretar(contexto, consola) {
        // Crear un nuevo vector con las dimensiones y el valor por defecto
        const vector = new Vector_1.Vector(this.dimensions, this.defaultValue);
        // Guardar el vector en el contexto
        contexto.guardarSimbolo(this.id, vector, this.tipoDato, this.line, this.column, Simbolo_1.tipoSimbolo.VECTOR);
        return null;
    }
}
exports.DeclaracionVector = DeclaracionVector;
