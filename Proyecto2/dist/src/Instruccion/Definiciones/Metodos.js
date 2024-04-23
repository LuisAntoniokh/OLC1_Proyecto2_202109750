"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metodos = void 0;
const Simbolo_1 = require("../../TablaSimbolos/Simbolo");
const Tablita_1 = require("../../TablaSimbolos/Tablita");
const Instruccion_1 = require("../Instruccion");
class Metodos extends Instruccion_1.Instruccion {
    constructor(tipo, id, parametros, bloque, linea, columna) {
        super(linea, columna);
        this.getParametros = () => this.parametros;
        this.getInstrucciones = () => this.bloque;
        this.tipo = tipo;
        this.id = id;
        this.parametros = parametros;
        this.bloque = bloque;
        this.retorno = null;
    }
    interpretar(contexto, consola) {
        const global = contexto.obtenerGlobal();
        global.guardarSimbolo(this.id, this, this.tipo, 0, 0, Simbolo_1.tipoSimbolo.FUNCION);
        const nuevoContexto = new Tablita_1.Contexto(contexto);
        this.retorno = this.bloque.interpretar(nuevoContexto, consola);
        if (this.retorno === null || this.retorno === undefined) {
            throw new Error("Function must return a value");
        }
        console.log(this.retorno);
        return this.retorno;
    }
}
exports.Metodos = Metodos;
