import { Contexto } from "../../TablaSimbolos/Tablita";
import { Expresion } from "../../Expresion/Expresion";
import { TipoDato } from "../../Expresion/Resultado";
import { Bloque } from "../Bloque";
import { Instruccion } from "../Instruccion";

export class CFor extends Instruccion{
    declaracion: Instruccion
    condicion: Expresion
    incremento: Instruccion
    instrucciones: Bloque

    constructor(declaracion:Instruccion,condicion:Expresion,incremento:Instruccion,instrucciones:Bloque,linea:number,columna:number){
        super(linea,columna)
        this.declaracion = declaracion
        this.condicion = condicion
        this.incremento = incremento
        this.instrucciones = instrucciones
    }

    public interpretar(contexto: Contexto, consola: string[]): null {
        this.declaracion.interpretar(contexto,consola)
        let condicion = this.condicion.interpretar(contexto)    
        if (condicion.tipo != TipoDato.BOOLEANO) throw new Error("La condicion no es booleana")
        while(condicion.valor){
            const retorno = this.instrucciones.interpretar(contexto,consola)
            if (retorno=="break"){
                console.log("break")
                break;
            }
            this.incremento.interpretar(contexto,consola)
            condicion = this.condicion.interpretar(contexto)
        }
        return null
    }
}