import { Expresion } from "./Expresion/Expresion";
import { Instruccion } from "./Instruccion/Instruccion";

export class AST {
    public instrucciones: Instruccion[]
    public consola:string[]
    constructor(instrucciones: Instruccion[]){
        this.instrucciones = instrucciones
        this.consola = []
    }

    public Ejecutar(){
        // Primera pasada
        this.instrucciones.forEach(instruccion => {
             if (typeof instruccion.interpretar === 'function') {
                 instruccion.interpretar(this.consola)
             } else {
                 console.error('Error: instruccion no tiene un método interpretar.');
             }
        });
     }
    public getConsola(){
        let salid = ""
        for (let index = 0; index < this.consola.length; index++) {
            salid += this.consola[index].toString();
        }
        return salid
    }
}