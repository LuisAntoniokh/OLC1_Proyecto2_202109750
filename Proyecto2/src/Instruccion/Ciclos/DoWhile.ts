import { Instruccion } from "../Instruccion";
import { Bloque } from "../Bloque";
import { Expresion } from "../../Expresion/Expresion";
import { Contexto } from "../../TablaSimbolos/Tablita";
import { TipoDato } from "../../Expresion/Resultado";

export class CDoWhile extends Instruccion{
    condicion: Expresion
    instrucciones: Bloque

    constructor(condicion:Expresion,instrucciones:Bloque,linea:number,columna:number){
        super(linea,columna)
        this.condicion = condicion
        this.instrucciones = instrucciones
    }
    public interpretar(contexto: Contexto, consola: string[]): null {
        do {
            const retorno = this.instrucciones.interpretar(contexto,consola)
            if (retorno=="break"){
                console.log("break;")
                break;
            }
            var condicion = this.condicion.interpretar(contexto)
            if (condicion.tipo != TipoDato.BOOLEANO) throw new Error("La condicion no es booleana")
        } while(condicion.valor)
        return null
    }
}