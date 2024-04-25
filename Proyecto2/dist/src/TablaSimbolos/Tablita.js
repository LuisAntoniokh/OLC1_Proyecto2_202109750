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
    obtenerSimbolo(id) {
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
    actualizarTipoSimbolo(id, nuevoTipo) {
        const simbolo = this.obtenerSimbolo(id);
        if (simbolo) {
            simbolo.tipo = nuevoTipo;
            this.actualizarSimbolo(id, simbolo);
        }
        else {
            throw new Error(`La variable ${id} no existe en el contexto actual`);
        }
    }
    obtenerGlobal() {
        let contexto = this;
        while (contexto.padre != null) {
            contexto = contexto.padre;
        }
        return contexto;
    }
    obtenerTabla() {
        let tabla = [];
        this.tabla.forEach((valor, clave) => {
            tabla.push({
                id: clave,
                tipo: typeof valor.obtenerValor,
                valor: valor.valor,
                fila: valor.fila,
                columna: valor.columna,
            });
        });
        return tabla;
    }
}
exports.Contexto = Contexto;
