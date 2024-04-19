"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decremento = void 0;
const Instruccion_1 = require("../Instruccion");
class Decremento extends Instruccion_1.Instruccion {
    constructor(id, fila, columna) {
        super(fila, columna);
        this.id = id;
    }
    interpretar(contexto, consola) {
        const simbolo = contexto.obtenerVariable(this.id);
        if (simbolo) {
            const valor = simbolo.obtenerValor();
            valor.valor--;
            simbolo.actualizarValor(valor);
            contexto.actualizarSimbolo(this.id, simbolo);
        }
        return null;
    }
}
exports.Decremento = Decremento;
