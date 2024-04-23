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
        var _a;
        const val = (_a = this.expresion) === null || _a === void 0 ? void 0 : _a.interpretar(contexto); // Add null check using '?'
        console.log(`Valor después de interpretar: ${val === null || val === void 0 ? void 0 : val.valor} en retorno`);
        if (val === null || val === undefined) {
            throw new Error("La interpretación de la expresión es null o undefined");
        }
        if (val.valor === undefined) {
            throw new Error("El valor de la interpretación es undefined");
        }
        return { valor: val.valor, tipo: val.tipo };
    }
}
exports.Return = Return;
