"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Execute = void 0;
const Instruccion_1 = require("./Instruccion");
class Execute extends Instruccion_1.Instruccion {
    constructor(llamada, linea, columna) {
        super(linea, columna);
        this.llamada = llamada;
    }
    interpretar(contexto, consola) {
        this.llamada.interpretar(contexto, consola);
        return null;
    }
}
exports.Execute = Execute;
