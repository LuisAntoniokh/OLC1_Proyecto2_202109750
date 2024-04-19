import { Contexto } from "../../TablaSimbolos/Tablita";
import { Expresion } from "../../Expresion/Expresion";
import { Instruccion } from "../Instruccion";

export class Incremento extends Instruccion {
    private id: string;

    constructor(id: string, fila: number, columna: number) {
        super(fila, columna);
        this.id = id;
    }

    public interpretar(contexto: Contexto, consola: string[]): null {
        const simbolo = contexto.obtenerVariable(this.id)
        if(simbolo){
            const valor = simbolo.obtenerValor() as any;
            valor.valor++;
            simbolo.actualizarValor(valor);
            contexto.actualizarSimbolo(this.id,simbolo);
        }
        return null;
    }
}
