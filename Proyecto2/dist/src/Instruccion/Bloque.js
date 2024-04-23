"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloque = void 0;
const Instruccion_1 = require("./Instruccion");
const Tablita_1 = require("../TablaSimbolos/Tablita");
class Bloque extends Instruccion_1.Instruccion {
    constructor(instrucciones) {
        super(0, 0);
        this.instrucciones = instrucciones;
    }
    interpretar(contexto, consola) {
        const nuevoContexto = new Tablita_1.Contexto(contexto);
        let retorno = null;
        for (const instruccion of this.instrucciones) {
            retorno = instruccion.interpretar(nuevoContexto, consola);
            if (retorno !== null && retorno !== undefined)
                return retorno;
        }
        return null;
    }
}
exports.Bloque = Bloque;
