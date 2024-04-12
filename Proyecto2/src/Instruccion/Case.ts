import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion";

export class Case extends Instruccion {
    expresion: Expresion;
    instrucciones: Instruccion[];

    constructor(expresion: Expresion, instrucciones: Instruccion[]) {
        super(0, 0);
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }

    public interpretar(consola: string[]): null {
        for (const instruccion of this.instrucciones) {
            instruccion.interpretar(consola);
            console.log("break");
        }
        return null;
    }
}