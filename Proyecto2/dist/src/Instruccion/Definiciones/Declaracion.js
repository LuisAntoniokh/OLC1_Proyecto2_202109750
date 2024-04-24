"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Simbolo_1 = require("../../TablaSimbolos/Simbolo");
const Resultado_1 = require("../../Expresion/Resultado");
const Instruccion_1 = require("../Instruccion");
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipo, ids, expresion, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.ids = ids;
        this.expresion = expresion;
    }
    interpretar(contexto, consola) {
        // Existe?
        const valor = this.expresion ? this.expresion.interpretar(contexto) : this.getDefaultValue(this.tipo);
        for (const id of this.ids) {
            contexto.guardarSimbolo(id, valor, this.tipo, 0, 0, Simbolo_1.tipoSimbolo.VARIABLE);
        }
        return null;
    }
    getDefaultValue(tipo) {
        switch (tipo) {
            case Resultado_1.TipoDato.NUMBER:
                return 0;
            case Resultado_1.TipoDato.DOUBLE:
                return 0.0;
            case Resultado_1.TipoDato.BOOLEANO:
                return "true";
            case Resultado_1.TipoDato.CHAR:
                return '\u0000';
            case Resultado_1.TipoDato.STRING:
                return "";
            default:
                return null;
        }
    }
}
exports.Declaracion = Declaracion;
