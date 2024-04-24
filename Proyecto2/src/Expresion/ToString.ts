import { Instruccion } from "../Instruccion/Instruccion";
import { Contexto } from "../TablaSimbolos/Tablita";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Resultado";

export class ToString extends Expresion {
    expresion: Expresion;

    constructor(expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.expresion = expresion;
    }

    public interpretar(contexto: Contexto): Resultado {
        const resultado = this.expresion.interpretar(contexto);
        if (resultado.tipo === TipoDato.NUMBER || resultado.tipo === TipoDato.BOOLEANO) {
            return {valor: resultado.valor.toString(), tipo: TipoDato.STRING};
        } else {
            throw new Error("Error semántico: toString solo puede usarse con números y booleanos");
        }
    }
}