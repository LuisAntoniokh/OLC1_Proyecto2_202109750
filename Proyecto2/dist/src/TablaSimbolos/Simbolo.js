"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(nombre, tipo, valor, fila, columna) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(consola) {
        //consola.push(this.valor + "\n");
    }
}
exports.Simbolo = Simbolo;
