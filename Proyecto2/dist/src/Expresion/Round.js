"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Round extends Expresion_1.Expresion {
    constructor(e1, linea, columna) {
        super(linea, columna);
        this.exp1 = e1;
    }
    interpretar(contexto) {
        const resultadoIzq = this.exp1.interpretar(contexto);
        if (resultadoIzq.tipo == Resultado_1.TipoDato.DOUBLE) {
            return { valor: Math.round(resultadoIzq.valor), tipo: Resultado_1.TipoDato.NUMBER };
        }
        throw new Error("Error en el tipo de dato");
    }
}
exports.Round = Round;
