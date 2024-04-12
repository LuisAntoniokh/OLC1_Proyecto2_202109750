"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Instruccion_1 = require("./Instruccion");
class Case extends Instruccion_1.Instruccion {
    constructor(expresion, instrucciones) {
        super(0, 0);
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }
    interpretar(consola) {
        for (const instruccion of this.instrucciones) {
            instruccion.interpretar(consola);
            console.log("break");
        }
        return null;
    }
}
exports.Case = Case;
