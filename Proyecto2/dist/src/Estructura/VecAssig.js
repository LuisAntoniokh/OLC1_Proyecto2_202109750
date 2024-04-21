"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionVector = void 0;
const Instruccion_1 = require("../Instruccion/Instruccion");
const Vector_1 = require("./Vector");
class AsignacionVector extends Instruccion_1.Instruccion {
    constructor(id, indices, value, line, column) {
        super(line, column);
        this.id = id;
        this.indices = Array.isArray(indices) ? indices : [indices];
        this.value = value;
    }
    interpretar(contexto, consola) {
        // Obtener el símbolo del contexto
        let simbolo = contexto.obtenerSimbolo(this.id);
        // Comprobar que el símbolo existe
        if (!simbolo) {
            throw new Error(`La variable ${this.id} no existe en el contexto actual`);
        }
        // Comprobar que el símbolo es un vector
        if (!(simbolo.valor instanceof Vector_1.Vector)) {
            throw new Error(`La variable ${this.id} no es un vector`);
        }
        // Interpretar los índices de acceso
        let evaluatedIndices = this.indices.map(index => index.interpretar(contexto).valor);
        // Interpretar el valor a asignar
        if (this.value !== null) {
            let evaluatedValue = this.value.interpretar(contexto).valor;
            // Acceder al vector y asignar el valor
            let vector = simbolo.valor;
            vector.set(evaluatedIndices, evaluatedValue);
            // Imprimir un mensaje de confirmación
            console.log(`Se ha asignado el valor ${evaluatedValue} en el vector ${this.id} con índices ${evaluatedIndices}`);
        }
        else {
            throw new Error(`El valor a asignar en el vector ${this.id} es null`);
        }
        return null;
    }
}
exports.AsignacionVector = AsignacionVector;
