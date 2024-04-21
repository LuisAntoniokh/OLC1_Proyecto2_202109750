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
        if (this.expresion === null) {
            return "return";
        } else {
            const valor = this.expresion.interpretar(contexto);
            return valor;
        }
    }
}