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
                let resultado = instruccion.interpretar(this.consola);
                if (resultado !== null && resultado !== undefined) {
                    this.consola.push(resultado);
                }
            } else {
                console.error(`Error: La instrucción de tipo ${instruccion.constructor.name} no tiene un método interpretar.`);
            }
        });
     }
     
     public getConsola(){
        let salid = ""
        for (let index = 0; index < this.consola.length; index++) {
            if (this.consola[index] !== null) {
                salid += this.consola[index].toString();
            }
        }
        return salid
    }
}