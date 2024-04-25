import { TipoDato } from "../../Expresion/Resultado";
import { tipoSimbolo } from "../../TablaSimbolos/Simbolo";
import { Contexto } from "../../TablaSimbolos/Tablita";
import { Bloque } from "../Bloque";
import { Instruccion } from "../Instruccion";

export class Funcion extends Instruccion{
    private tipo:TipoDato
    private id:string
    private parametros:any[]
    private bloque:Bloque
    contexto: any;
    constructor(tipo:TipoDato,id:string,parametros:any[],bloque:Bloque ,linea:number,columna:number){
        super(linea,columna)
        this.tipo = tipo
        this.id = id
        this.parametros = parametros
        this.bloque = bloque
    }
    public interpretar(contexto: Contexto, consola: string[]): string | null {
        const global = contexto.obtenerGlobal()
        global.guardarSimbolo(this.id,this,this.tipo,0,0,tipoSimbolo.FUNCION)
        return null
    }
    public getParametros = () => this.parametros
    public getInstrucciones = () => this.bloque
}