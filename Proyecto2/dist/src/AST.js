"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Tablita_1 = require("./TablaSimbolos/Tablita");
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = [];
        this.contextoGlobal = new Tablita_1.Contexto(null);
    }
    Ejecutar() {
        // Primera pasada
        this.instrucciones.forEach(instruccion => {
            instruccion.interpretar(this.contextoGlobal, this.consola);
        });
    }
    getConsola() {
        let salid = "";
        for (let index = 0; index < this.consola.length; index++) {
            if (this.consola[index] !== null) {
                salid += this.consola[index].toString();
            }
        }
        return salid;
    }
}
exports.AST = AST;
