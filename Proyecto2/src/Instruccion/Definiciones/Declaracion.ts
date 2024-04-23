import { tipoSimbolo } from "../../TablaSimbolos/Simbolo";
import { Contexto } from "../../TablaSimbolos/Tablita";
import { Expresion } from "../../Expresion/Expresion";
import { TipoDato } from "../../Expresion/Resultado";
import { Instruccion } from "../Instruccion";

export class Declaracion extends Instruccion{
    tipo:TipoDato
    id:string
    expresion:Expresion

    constructor(tipo:TipoDato,id:string,expresion:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.tipo = tipo
        this.id = id
        this.expresion = expresion
    }

    public interpretar(contexto:Contexto,consola: string[]): null {
       // Existe?
        const valor = this.expresion.interpretar(contexto)
        if (valor === null || valor === undefined) {
            throw new Error("La interpretación de la expresión es null o undefined EN DECLARACION");
        }
        contexto.guardarSimbolo(this.id,valor,valor.tipo, this.line, this.column, tipoSimbolo.VARIABLE)
        return null
    }

}
