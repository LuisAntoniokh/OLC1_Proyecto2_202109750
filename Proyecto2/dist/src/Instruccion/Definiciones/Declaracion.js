"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Simbolo_1 = require("../../TablaSimbolos/Simbolo");
const Instruccion_1 = require("../Instruccion");
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipo, id, expresion, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.expresion = expresion;
    }
    interpretar(contexto, consola) {
        // Existe?
        const valor = this.expresion.interpretar(contexto);
        contexto.guardarSimbolo(this.id, valor, valor.tipo, this.line, this.column, Simbolo_1.tipoSimbolo.VARIABLE);
        return null;
    }
}
exports.Declaracion = Declaracion;
