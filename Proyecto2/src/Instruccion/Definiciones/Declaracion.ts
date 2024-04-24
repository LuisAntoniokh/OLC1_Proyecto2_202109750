import { tipoSimbolo } from "../../TablaSimbolos/Simbolo";
import { Contexto } from "../../TablaSimbolos/Tablita";
import { Expresion } from "../../Expresion/Expresion";
import { TipoDato } from "../../Expresion/Resultado";
import { Instruccion } from "../Instruccion";

export class Declaracion extends Instruccion{
    tipo: TipoDato;
    ids: string[];
    expresion: Expresion | null;

    constructor(tipo: TipoDato, ids: string[], expresion: Expresion | null, linea: number, columna: number) {
        super(linea, columna);
        this.tipo = tipo;
        this.ids = ids;
        this.expresion = expresion;
    }

    public interpretar(contexto:Contexto,consola: string[]): null {
       // Existe?
       const valor = this.expresion ? this.expresion.interpretar(contexto) : this.getDefaultValue(this.tipo);
       for (const id of this.ids) {
           contexto.guardarSimbolo(id, valor, this.tipo, 0, 0, tipoSimbolo.VARIABLE);
       }
       return null;
    }

    private getDefaultValue(tipo: TipoDato): any {
        switch (tipo) {
            case TipoDato.NUMBER:
                return 0;
            case TipoDato.DOUBLE:
                return 0.0;
            case TipoDato.BOOLEANO:
                return "true";
            case TipoDato.CHAR:
                return '\u0000';
            case TipoDato.STRING:
                return "";
            default:
                return null;
                
        }
    }
}
