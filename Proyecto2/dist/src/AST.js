"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Tablita_1 = require("./TablaSimbolos/Tablita");
const Primitivo_1 = require("./Expresion/Primitivo");
const Resultado_1 = require("./Expresion/Resultado");
const Declaracion_1 = require("./Instruccion/Definiciones/Declaracion");
const Funcion_1 = require("./Instruccion/Definiciones/Funcion");
const Execute_1 = require("./Instruccion/Execute");
const Print_1 = require("./Instruccion/Print");
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = [];
        this.contextoGlobal = new Tablita_1.Contexto(null);
        this.contadorExec = 0;
    }
    Ejecutar() {
        // Primera pasada
        this.instrucciones.forEach(instruccion => {
            if (instruccion instanceof Funcion_1.Funcion
                || instruccion instanceof Declaracion_1.Declaracion) {
                instruccion.interpretar(this.contextoGlobal, this.consola);
            }
        });
        // Segunda pasada
        this.instrucciones.forEach(instruccion => {
            if (instruccion instanceof Execute_1.Execute) {
                if (this.contadorExec > 0) {
                    const print = new Print_1.Print(new Primitivo_1.Primitivo("Ya existe una función Exec", Resultado_1.TipoDato.STRING, 0, 0), true, 0, 0);
                    print.interpretar(this.contextoGlobal, this.consola);
                    return;
                }
                instruccion.interpretar(this.contextoGlobal, this.consola);
                this.contadorExec++;
            }
            else if (!(instruccion instanceof Funcion_1.Funcion)
                && instruccion instanceof Declaracion_1.Declaracion) {
                const print = new Print_1.Print(new Primitivo_1.Primitivo("Esta instruccion debe estar en una función", Resultado_1.TipoDato.STRING, 0, 0), true, 0, 0);
                print.interpretar(this.contextoGlobal, this.consola);
            }
        });
        console.table(this.contextoGlobal.obtenerTabla());
    }
    getConsola() {
        console.log(this.consola);
        let salid = "";
        for (let index = 0; index < this.consola.length; index++) {
            salid += this.consola[index].toString();
        }
        console.log(salid);
        return salid;
    }
}
exports.AST = AST;
