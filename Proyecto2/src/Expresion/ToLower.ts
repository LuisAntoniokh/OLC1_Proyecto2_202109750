import { Contexto } from "../TablaSimbolos/Tablita";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Resultado";

export class ToLower extends Expresion{
    exp1:Expresion;
    constructor(e1:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.exp1 = e1;
    }
    interpretar(contexto: Contexto): Resultado {
        const resultadoIzq = this.exp1.interpretar(contexto)
        if (resultadoIzq.tipo == TipoDato.STRING){
            return {valor:resultadoIzq.valor.toString().toLowerCase(),tipo:TipoDato.STRING}
        }
        throw new Error("Error en el tipo de dato")
    }
}