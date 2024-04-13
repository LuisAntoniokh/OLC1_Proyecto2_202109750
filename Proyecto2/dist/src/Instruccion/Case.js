"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Instruccion_1 = require("./Instruccion");
class Case extends Instruccion_1.Instruccion {
    constructor(expresion, instrucciones, hasbreak) {
        super(0, 0);
        this.hasbreak = hasbreak;
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }
    interpretar(consola) {
        for (const instruccion of this.instrucciones) {
            const result = instruccion.interpretar(consola);
            console.log(result);
        }
        return null;
    }
}
exports.Case = Case;
