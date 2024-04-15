"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoSimbolo = exports.Simbolo = void 0;
class Simbolo {
    constructor(nombre, tipo, valor, fila, columna, tipoSimbolo) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipoSimbolo = tipoSimbolo;
    }
    //interpretar(consola: string[]): void { consola.push(this.valor + "\n");}
    obtenerValor() {
        return this.valor;
    }
    actualizarValor(valor) {
        this.valor = valor;
    }
}
exports.Simbolo = Simbolo;
var tipoSimbolo;
(function (tipoSimbolo) {
    tipoSimbolo[tipoSimbolo["VARIABLE"] = 0] = "VARIABLE";
})(tipoSimbolo || (exports.tipoSimbolo = tipoSimbolo = {}));
