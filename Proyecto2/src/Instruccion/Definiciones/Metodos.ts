import { TipoDato } from "../../Expresion/Resultado"
import { tipoSimbolo } from "../../TablaSimbolos/Simbolo"
import { Contexto } from "../../TablaSimbolos/Tablita"
import { Bloque } from "../Bloque"
import { Instruccion } from "../Instruccion"

export class Metodos extends Instruccion{
    private tipo:TipoDato
    private id:string
    private parametros:any[]
    private bloque:Bloque
    private retorno: any
    

    constructor(tipo:TipoDato,id:string,parametros:any[],bloque:Bloque ,linea:number,columna:number){
        super(linea,columna)
        this.tipo = tipo
        this.id = id
        this.parametros = parametros
        this.bloque = bloque
        this.retorno = null
    }

    public interpretar(contexto: Contexto, consola: string[]): any {
        const global = contexto.obtenerGlobal()
        global.guardarSimbolo(this.id,this,this.tipo,0,0,tipoSimbolo.METODO)
        this.retorno = this.bloque.interpretar(contexto, consola)
        if (this.retorno === null || this.retorno === undefined) {
            throw new Error("Function must return a value")
        }
        return this.retorno
    }

    public getParametros = () => this.parametros
    public getInstrucciones = () => this.bloque
}