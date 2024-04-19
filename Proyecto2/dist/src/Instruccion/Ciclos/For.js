"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CFor = void 0;
const Resultado_1 = require("../../Expresion/Resultado");
const Instruccion_1 = require("../Instruccion");
class CFor extends Instruccion_1.Instruccion {
    constructor(declaracion, condicion, incremento, instrucciones, linea, columna) {
        super(linea, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.incremento = incremento;
        this.instrucciones = instrucciones;
    }
    interpretar(contexto, consola) {
        this.declaracion.interpretar(contexto, consola);
        let condicion = this.condicion.interpretar(contexto);
        if (condicion.tipo != Resultado_1.TipoDato.BOOLEANO)
            throw new Error("La condicion no es booleana");
        while (condicion.valor) {
            const retorno = this.instrucciones.interpretar(contexto, consola);
            if (retorno == "break") {
                console.log("break");
                break;
            }
            this.incremento.interpretar(contexto, consola);
            condicion = this.condicion.interpretar(contexto);
        }
        return null;
    }
}
exports.CFor = CFor;
