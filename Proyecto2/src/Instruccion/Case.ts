import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion";

export class Case extends Instruccion {
    expresion: Expresion;
    instrucciones: Instruccion[];

    constructor(expresion: Expresion, instrucciones: Instruccion[], public hasbreak: boolean) {
        super(0, 0);
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }

    public interpretar(consola: string[]): null {
        for (const instruccion of this.instrucciones) {
            const result = instruccion.interpretar(consola);
            console.log(result);
        }
        return null;
    }
}