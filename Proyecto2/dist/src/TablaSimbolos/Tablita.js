"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contexto = void 0;
const Simbolo_1 = require("./Simbolo");
class Contexto {
    constructor(padre) {
        this.tabla = new Map;
        this.padre = padre;
    }
    guardarSimbolo(id, valor, tipo, fila, columna, tipoSimbolo) {
        const existe = this.tabla.has(id);
        if (!existe) {
            this.tabla.set(id, new Simbolo_1.Simbolo(id, tipo, valor, fila, columna, tipoSimbolo));
            console.log("Variable guardada");
            return;
        }
        throw new Error("La variable ya fue declarada");
    }
    obtenerVariable(id) {
        let contexto_actual = this;
        while (contexto_actual != null) {
            const existe = contexto_actual.tabla.has(id);
            if (existe) {
                // Obtenemos valor y retornamos
                return contexto_actual.tabla.get(id);
            }
            // Siguiente contexto
            contexto_actual = contexto_actual.padre;
        }
        return undefined;
    }
    actualizarSimbolo(id, valor) {
        this.tabla.set(id, valor);
    }
}
exports.Contexto = Contexto;
