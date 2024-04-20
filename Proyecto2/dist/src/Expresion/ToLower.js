"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToLower = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class ToLower extends Expresion_1.Expresion {
    constructor(e1, linea, columna) {
        super(linea, columna);
        this.exp1 = e1;
    }
    interpretar(contexto) {
        const resultadoIzq = this.exp1.interpretar(contexto);
        if (resultadoIzq.tipo == Resultado_1.TipoDato.STRING) {
            return { valor: resultadoIzq.valor.toString().toLowerCase(), tipo: Resultado_1.TipoDato.STRING };
        }
        throw new Error("Error en el tipo de dato");
    }
}
exports.ToLower = ToLower;
