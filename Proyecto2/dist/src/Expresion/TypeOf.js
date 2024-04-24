"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typeof = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Typeof extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    interpretar(contexto) {
        const resultado = this.expresion.interpretar(contexto);
        const tipo = this.getTipoDatoName(resultado.tipo);
        console.log("typeof: ", tipo);
        return { valor: tipo, tipo: Resultado_1.TipoDato.STRING };
    }
    getTipoDatoName(tipo) {
        switch (tipo) {
            case Resultado_1.TipoDato.NUMBER:
                return "INT";
            case Resultado_1.TipoDato.DOUBLE:
                return "DOUBLE";
            case Resultado_1.TipoDato.BOOLEANO:
                return "BOOLEAN";
            case Resultado_1.TipoDato.CHAR:
                return "CHAR";
            case Resultado_1.TipoDato.STRING:
                return "STRING";
            default:
                return "UNKNOWN";
        }
    }
}
exports.Typeof = Typeof;
