import { Instruccion } from "./Instruccion";
import { Contexto } from "../TablaSimbolos/Tablita";
import { Return } from "./Control/Return";

export class Bloque extends Instruccion{
    instrucciones: Instruccion[]

    constructor(instrucciones: Instruccion[]){
        super(0,0)
        this.instrucciones = instrucciones
    }

    public interpretar(contexto:Contexto,consola: string[]): any {
        const nuevoContexto = new Contexto(contexto)
        let retorno: any = null;
        for (const instruccion of this.instrucciones) {
            retorno = instruccion.interpretar(nuevoContexto,consola)
            if(retorno !== null && retorno !== undefined) return retorno
        } 
        return null;
    }
}