import { Expresion } from "../../Expresion/Expresion";
import { Contexto } from "../../TablaSimbolos/Tablita";
import { Instruccion } from "../Instruccion";

export class Return extends Instruccion{
    private expresion: Expresion | null;

    constructor(expresion: Expresion | null, linea:number, columna:number){
        super(linea,columna)
        this.expresion = expresion;
    }

    public interpretar(contexto: Contexto, consola: string[]): any {
        const val = this.expresion?.interpretar(contexto); // Add null check using '?'
        console.log(`Valor después de interpretar: ${val?.valor} en retorno`);
        if (val === null || val === undefined) {
            throw new Error("La interpretación de la expresión es null o undefined");
        }
        if (val.valor === undefined) {
            throw new Error("El valor de la interpretación es undefined");
        }
        return { valor: val.valor, tipo: val.tipo };
    }
}