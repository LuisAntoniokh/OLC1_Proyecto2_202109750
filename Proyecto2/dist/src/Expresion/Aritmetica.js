"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Aritmetica extends Expresion_1.Expresion {
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(e1, e2, op, linea, columna) {
        super(linea, columna);
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2;
    }
    interpretar() {
        // Ejecutamos los noterminales
        const resultadoIzq = this.exp1.interpretar();
        const resultadoDer = this.exp2.interpretar();
        // Lógica del intérprete
        // Comparamos el tipo de operación
        if (this.Operacion == Resultado_1.OpAritmetica.SUMA) {
            // Valor dominante
            const dominante = SUMAS[resultadoIzq.tipo][resultadoDer.tipo];
            if (dominante == Resultado_1.TipoDato.NULO) {
                throw Error("tipo dato no valido");
            }
            if (dominante == Resultado_1.TipoDato.NUMBER || Resultado_1.TipoDato.DOUBLE == dominante) {
                if (resultadoIzq.tipo == Resultado_1.TipoDato.BOOLEANO)
                    resultadoIzq.valor = resultadoIzq.valor ? 1 : 0;
                if (resultadoDer.tipo == Resultado_1.TipoDato.BOOLEANO)
                    resultadoDer.valor = resultadoDer.valor ? 1 : 0;
            }
            else if (dominante == Resultado_1.TipoDato.STRING) {
                return { valor: resultadoIzq.valor.toString() + resultadoDer.valor.toString(), tipo: dominante };
            }
            // Operacion
            return { valor: resultadoIzq.valor + resultadoDer.valor, tipo: dominante };
        }
        else if (this.Operacion == Resultado_1.OpAritmetica.RESTA) {
            const dominante = RESTAS[resultadoIzq.tipo][resultadoDer.tipo];
            if (dominante == Resultado_1.TipoDato.NULO) {
                throw Error("tipo dato no valido");
            }
            return { valor: resultadoIzq.valor - resultadoDer.valor, tipo: dominante };
        }
        else if (this.Operacion == Resultado_1.OpAritmetica.PRODUCTO) {
            const dominante = PRODUCTO[resultadoIzq.tipo][resultadoDer.tipo];
            if (dominante == Resultado_1.TipoDato.NULO) {
                throw Error("tipo dato no valido");
            }
            return { valor: resultadoIzq.valor * resultadoDer.valor, tipo: dominante };
        }
        else if (this.Operacion == Resultado_1.OpAritmetica.DIVISION) {
            const dominante = DIVISION[resultadoIzq.tipo][resultadoDer.tipo];
            if (dominante == Resultado_1.TipoDato.NULO) {
                throw Error("tipo dato no valido");
            }
            return { valor: resultadoIzq.valor / resultadoDer.valor, tipo: dominante };
        }
        return { valor: null, tipo: Resultado_1.TipoDato.NULO };
    }
}
exports.Aritmetica = Aritmetica;
const SUMAS = [
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.STRING],
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.STRING],
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.STRING],
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.STRING, Resultado_1.TipoDato.STRING],
    [Resultado_1.TipoDato.STRING, Resultado_1.TipoDato.STRING, Resultado_1.TipoDato.STRING, Resultado_1.TipoDato.STRING, Resultado_1.TipoDato.STRING],
];
const RESTAS = [
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
];
const PRODUCTO = [
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NUMBER, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
];
const DIVISION = [
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.DOUBLE, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
    [Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO, Resultado_1.TipoDato.NULO],
];
