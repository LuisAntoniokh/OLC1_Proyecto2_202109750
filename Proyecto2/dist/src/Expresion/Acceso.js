"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acceso = void 0;
const Simbolo_1 = require("../TablaSimbolos/Simbolo");
const Expresion_1 = require("./Expresion");
class Acceso extends Expresion_1.Expresion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    interpretar(contexto) {
        const simbolo = contexto.obtenerVariable(this.id);
        if (simbolo) {
            if (simbolo.tipoSimbolo == Simbolo_1.tipoSimbolo.VARIABLE) {
                const resultado = simbolo.obtenerValor();
                return { valor: resultado.valor, tipo: resultado.tipo };
            }
            throw new Error("No es una variable");
        }
        throw new Error("No existe la variable");
    }
}
exports.Acceso = Acceso;
