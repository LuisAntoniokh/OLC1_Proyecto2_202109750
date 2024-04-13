"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const Instruccion_1 = require("./Instruccion");
class Default extends Instruccion_1.Instruccion {
    constructor(instrucciones) {
        super(0, 0);
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
exports.Default = Default;
