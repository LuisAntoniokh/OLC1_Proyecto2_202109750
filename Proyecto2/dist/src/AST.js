"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = [];
    }
    Ejecutar() {
        // Primera pasada
        this.instrucciones.forEach(instruccion => {
            if (typeof instruccion.interpretar === 'function') {
                let resultado = instruccion.interpretar(this.consola);
                if (resultado !== null && resultado !== undefined) {
                    this.consola.push(resultado);
                }
            }
            else {
                console.error(`Error: La instrucción de tipo ${instruccion.constructor.name} no tiene un método interpretar.`);
            }
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
