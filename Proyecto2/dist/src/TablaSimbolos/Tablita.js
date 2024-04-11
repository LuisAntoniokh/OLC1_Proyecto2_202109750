"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaSimbolos = void 0;
const Simbolo_1 = require("./Simbolo");
class TablaSimbolos {
    constructor() {
        this.tabla = new Map();
    }
    guardar(nombre, tipo, valor, fila, columna) {
        let simbolo = new Simbolo_1.Simbolo(nombre, tipo, valor, fila, columna);
        this.tabla.set(nombre, simbolo);
    }
    obtener(nombre) {
        return this.tabla.get(nombre);
    }
    interpretar(instrucciones) {
        let nombresVariables = Array.from(this.tabla.keys());
        instrucciones.interpretar(nombresVariables);
    }
    imprimir() {
        this.tabla.forEach((simbolo, nombre) => {
            console.log(`Nombre: ${nombre}, Tipo: ${simbolo.tipo}, Valor: ${simbolo.valor}`);
        });
    }
}
exports.TablaSimbolos = TablaSimbolos;
