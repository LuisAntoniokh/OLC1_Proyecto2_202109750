import { Contexto } from "../../TablaSimbolos/Tablita";
import { Instruccion } from "../Instruccion";

export class Continue extends Instruccion{
    constructor(linea:number,columna:number){
        super(linea,columna)
    }
    
    public interpretar(contexto: Contexto, consola: string[]): null | string {
        return "continue"
    }
}