import { Instruccion } from "../Instruccion/Instruccion";
import { Contexto } from "../TablaSimbolos/Tablita";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Resultado";

export class Typeof extends Expresion {
    expresion: Expresion;

    constructor(expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.expresion = expresion;
    }

    public interpretar(contexto: Contexto): Resultado {
        const resultado = this.expresion.interpretar(contexto);
        const tipo = this.getTipoDatoName(resultado.tipo);
        console.log("typeof: ", tipo);
        return {valor: tipo, tipo: TipoDato.STRING};
    }

    private getTipoDatoName(tipo: TipoDato): string {
        switch (tipo) {
            case TipoDato.NUMBER:
                return "INT";
            case TipoDato.DOUBLE:
                return "DOUBLE";
            case TipoDato.BOOLEANO:
                return "BOOLEAN";
            case TipoDato.CHAR:
                return "CHAR";
            case TipoDato.STRING:
                return "STRING";
            default:
                return "UNKNOWN";
        }
    }
}