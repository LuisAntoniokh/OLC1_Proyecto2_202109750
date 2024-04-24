"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToString = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class ToString extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    interpretar(contexto) {
        const resultado = this.expresion.interpretar(contexto);
        if (resultado.tipo === Resultado_1.TipoDato.NUMBER || resultado.tipo === Resultado_1.TipoDato.BOOLEANO) {
            return { valor: resultado.valor.toString(), tipo: Resultado_1.TipoDato.STRING };
        }
        else {
            throw new Error("Error semántico: toString solo puede usarse con números y booleanos");
        }
    }
}
exports.ToString = ToString;
