import { Expresion } from "../../Expresion/Expresion";
import { TipoDato } from "../../Expresion/Resultado";
import { Bloque } from "../Bloque";
import { Instruccion } from "../Instruccion";
import { Contexto } from "../../TablaSimbolos/Tablita";

export class FN_IF extends Instruccion{
    condicion: Expresion
    bloqueIf: Bloque
    bloqueElse: Bloque

    constructor(condicion:Expresion,bloqueIf:Bloque,bloqueElse:Bloque,linea:number,columna:number){
        super(linea,columna)
        this.condicion = condicion
        this.bloqueIf = bloqueIf
        this.bloqueElse  = bloqueElse
    }

    public interpretar(contexto:Contexto,consola: string[]): null | string {
        const condicion = this.condicion.interpretar(contexto)
        if (condicion.tipo!=TipoDato.BOOLEANO)
            throw Error("La condicion no es booleana")
        if (condicion.valor){
            if (this.bloqueIf === null || this.bloqueIf === undefined) {
                throw new Error("El bloque 'if' es null o undefined");
            }
            const retorno =  this.bloqueIf.interpretar(contexto,consola)
            console.log("retorno en if" + retorno.valor)
            if (retorno) return retorno
        } else {
            console.log("else")
            console.log({else:this.bloqueElse})
            if (this.bloqueElse === null || this.bloqueElse === undefined) {
                throw new Error("El bloque 'else' es null o undefined");
            }
            const retorno = this.bloqueElse?.interpretar(contexto,consola)
            console.log("retorno en else" + retorno.valor)
            if (retorno) return retorno
        }
        return null
    }
}