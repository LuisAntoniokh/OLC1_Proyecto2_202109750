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
    interpretar(contexto, consola) {
        for (const instruccion of this.instrucciones) {
            const result = instruccion.interpretar(contexto, consola);
            console.log(result);
            if (result == "break") {
                return "break";
            }
        }
        return null;
    }
}
exports.Case = Case;
