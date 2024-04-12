import { Instruccion } from "./Instruccion";

export class Default extends Instruccion {
    instrucciones: Instruccion[];

    constructor(instrucciones: Instruccion[]) {
        super(0, 0);
        this.instrucciones = instrucciones;
    }

    public interpretar(consola: string[]): null {
        for (const instruccion of this.instrucciones) {
            instruccion.interpretar(consola);
        }
        return null;
    }
}