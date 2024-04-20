"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casteo = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Casteo extends Expresion_1.Expresion {
    constructor(tipo, expresion, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.expresion = expresion;
    }
    interpretar(contexto) {
        const resultadoIzq = this.expresion.interpretar(contexto);
        switch (this.tipo) {
            case Resultado_1.TipoDato.STRING:
                return { valor: resultadoIzq.valor.toString(), tipo: Resultado_1.TipoDato.STRING };
            case Resultado_1.TipoDato.NUMBER:
                if (typeof resultadoIzq.valor === 'string') {
                    if (resultadoIzq.valor.length === 1) {
                        // char to int
                        return { valor: resultadoIzq.valor.charCodeAt(0), tipo: Resultado_1.TipoDato.NUMBER };
                    }
                    else {
                        // string to int
                        return { valor: parseInt(resultadoIzq.valor), tipo: Resultado_1.TipoDato.NUMBER };
                    }
                }
                else {
                    // double to int
                    return { valor: Math.floor(resultadoIzq.valor), tipo: Resultado_1.TipoDato.NUMBER };
                }
            case Resultado_1.TipoDato.DOUBLE:
                if (typeof resultadoIzq.valor === 'string') {
                    if (resultadoIzq.valor.length === 1) {
                        // char to double
                        return { valor: resultadoIzq.valor.charCodeAt(0), tipo: Resultado_1.TipoDato.DOUBLE };
                    }
                    else {
                        // string to double
                        return { valor: parseFloat(resultadoIzq.valor), tipo: Resultado_1.TipoDato.DOUBLE };
                    }
                }
                else {
                    // int to double
                    return { valor: Number(resultadoIzq.valor), tipo: Resultado_1.TipoDato.DOUBLE };
                }
            case Resultado_1.TipoDato.CHAR:
                if (typeof resultadoIzq.valor === 'number') {
                    // int to char
                    return { valor: String.fromCharCode(resultadoIzq.valor), tipo: Resultado_1.TipoDato.CHAR };
                }
                else {
                    throw new Error("Error en el tipo de dato");
                }
            default:
                throw new Error("Error en el tipo de dato");
        }
    }
}
exports.Casteo = Casteo;
