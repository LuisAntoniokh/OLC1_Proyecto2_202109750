"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const Expresion_1 = require("../../Expresion/Expresion");
const Resultado_1 = require("../../Expresion/Resultado");
class Ternario extends Expresion_1.Expresion {
    constructor(condicion, expresionVerdadera, expresionFalsa, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.expresionVerdadera = expresionVerdadera;
        this.expresionFalsa = expresionFalsa;
    }
    interpretar() {
        const condicion = this.condicion.interpretar();
        if (condicion.tipo != Resultado_1.TipoDato.BOOLEANO)
            throw Error("La x no es booleana");
        if (condicion.valor) {
            this.expresionVerdadera.interpretar();
        }
        else {
            console.log("else ");
            console.log({ else: this.expresionFalsa });
            this.expresionFalsa.interpretar();
        }
        return { tipo: Resultado_1.TipoDato.NULO, valor: null };
    }
}
exports.Ternario = Ternario;
