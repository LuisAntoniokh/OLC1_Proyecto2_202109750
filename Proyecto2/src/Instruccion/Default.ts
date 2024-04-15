import { Instruccion } from "./Instruccion";
import { Contexto } from "../TablaSimbolos/Tablita";

export class Default extends Instruccion {
    instrucciones: Instruccion[];

    constructor(instrucciones: Instruccion[]) {
        super(0, 0);
        this.instrucciones = instrucciones;
    }

    public interpretar(contexto:Contexto ,consola: string[]): null | string {
        for (const instruccion of this.instrucciones) {
            const result = instruccion.interpretar(contexto, consola);
            console.log(result);
            if (result == "break") {
                return "break";
            }
        }
        return null;
    }
}