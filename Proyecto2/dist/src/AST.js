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
                instruccion.interpretar(this.consola);
            }
            else {
                console.error('Error: instruccion no tiene un método interpretar.');
            }
        });
    }
    getConsola() {
        let salid = "";
        for (let index = 0; index < this.consola.length; index++) {
            salid += this.consola[index].toString();
        }
        return salid;
    }
}
exports.AST = AST;
