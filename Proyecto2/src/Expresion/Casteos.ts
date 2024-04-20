import { Contexto } from "../TablaSimbolos/Tablita";
import { Expresion } from "./Expresion";
import { TipoDato } from "./Resultado";
import { Instruccion } from "../Instruccion/Instruccion";

export class Casteo extends Expresion{
    tipo:TipoDato
    expresion:Expresion
    constructor(tipo:TipoDato,expresion:Expresion,linea:number,columna:number){
        super(linea,columna)
        this.tipo = tipo
        this.expresion = expresion
    }
    interpretar(contexto: Contexto): any {
        const resultadoIzq = this.expresion.interpretar(contexto)
        switch (this.tipo) {
            case TipoDato.STRING:
                return {valor: resultadoIzq.valor.toString(), tipo: TipoDato.STRING};
            case TipoDato.NUMBER:
                if (typeof resultadoIzq.valor === 'string') {
                    if (resultadoIzq.valor.length === 1) {
                        // char to int
                        return {valor: resultadoIzq.valor.charCodeAt(0), tipo: TipoDato.NUMBER};
                    } else {
                        // string to int
                        return {valor: parseInt(resultadoIzq.valor), tipo: TipoDato.NUMBER};
                    }
                } else {
                    // double to int
                    return {valor: Math.floor(resultadoIzq.valor), tipo: TipoDato.NUMBER};
                }
            case TipoDato.DOUBLE:
                if (typeof resultadoIzq.valor === 'string') {
                    if (resultadoIzq.valor.length === 1) {
                        // char to double
                        return {valor: resultadoIzq.valor.charCodeAt(0), tipo: TipoDato.DOUBLE};
                    } else {
                        // string to double
                        return {valor: parseFloat(resultadoIzq.valor), tipo: TipoDato.DOUBLE};
                    }
                } else {
                    // int to double
                    return {valor: Number(resultadoIzq.valor), tipo: TipoDato.DOUBLE};
                }
            case TipoDato.CHAR:
                if (typeof resultadoIzq.valor === 'number') {
                    // int to char
                    return {valor: String.fromCharCode(resultadoIzq.valor), tipo: TipoDato.CHAR};
                } else {
                    throw new Error("Error en el tipo de dato");
                }
            default:
                throw new Error("Error en el tipo de dato");
        }
    }
}