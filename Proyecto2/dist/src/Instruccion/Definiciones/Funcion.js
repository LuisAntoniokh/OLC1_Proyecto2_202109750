"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const Simbolo_1 = require("../../TablaSimbolos/Simbolo");
const Instruccion_1 = require("../Instruccion");
class Funcion extends Instruccion_1.Instruccion {
    constructor(tipo, id, parametros, bloque, linea, columna) {
        super(linea, columna);
        this.getParametros = () => this.parametros;
        this.getInstrucciones = () => this.bloque;
        this.tipo = tipo;
        this.id = id;
        this.parametros = parametros;
        this.bloque = bloque;
    }
    interpretar(contexto, consola) {
        const global = contexto.obtenerGlobal();
        global.guardarSimbolo(this.id, this, this.tipo, 0, 0, Simbolo_1.tipoSimbolo.FUNCION);
        return null;
    }
}
exports.Funcion = Funcion;
