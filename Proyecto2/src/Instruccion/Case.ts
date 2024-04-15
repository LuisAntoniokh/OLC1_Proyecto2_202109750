import { Expresion } from "../Expresion/Expresion";
import { Contexto } from "../TablaSimbolos/Tablita";
import { Instruccion } from "./Instruccion";

export class Case extends Instruccion {
    expresion: Expresion;
    instrucciones: Instruccion[];

    constructor(expresion: Expresion, instrucciones: Instruccion[], public hasbreak: boolean) {
        super(0, 0);
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }

    public interpretar(contexto: Contexto, consola: string[]): null | string {
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