"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWhile = void 0;
const Resultado_1 = require("../../Expresion/Resultado");
const Instruccion_1 = require("../Instruccion");
class CWhile extends Instruccion_1.Instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    interpretar(contexto, consola) {
        let condicion = this.condicion.interpretar(contexto);
        if (condicion.tipo != Resultado_1.TipoDato.BOOLEANO)
            throw new Error("La condicion no es booleana");
        try {
            while (condicion.valor) {
                // Se ejecutan las instrucciones
                const retorno = this.instrucciones.interpretar(contexto, consola);
                if (retorno == "break") {
                    console.log("break");
                    break;
                }
                // Se calcula la condicion
                condicion = this.condicion.interpretar(contexto);
            }
        }
        catch (error) {
            consola.push(error + "");
            console.log({ error });
        }
        return null;
    }
}
exports.CWhile = CWhile;
