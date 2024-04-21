"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Instruccion_1 = require("../Instruccion");
class Return extends Instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    interpretar(contexto, consola) {
        if (this.expresion === null) {
            return "return";
        }
        else {
            const valor = this.expresion.interpretar(contexto);
            return valor;
        }
    }
}
exports.Return = Return;
