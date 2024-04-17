"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDoWhile = void 0;
const Instruccion_1 = require("../Instruccion");
const Resultado_1 = require("../../Expresion/Resultado");
class CDoWhile extends Instruccion_1.Instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    interpretar(contexto, consola) {
        do {
            const retorno = this.instrucciones.interpretar(contexto, consola);
            if (retorno == "break") {
                console.log("break;");
                break;
            }
            var condicion = this.condicion.interpretar(contexto);
            if (condicion.tipo != Resultado_1.TipoDato.BOOLEANO)
                throw new Error("La condicion no es booleana");
        } while (condicion.valor);
        return null;
    }
}
exports.CDoWhile = CDoWhile;
