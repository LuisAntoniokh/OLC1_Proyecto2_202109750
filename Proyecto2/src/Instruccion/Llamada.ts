import { Expresion } from "../Expresion/Expresion";
import { tipoSimbolo } from "../TablaSimbolos/Simbolo";
import { Contexto } from "../TablaSimbolos/Tablita";
import { Return } from "./Control/Return";
import { Funcion } from "./Definiciones/Funcion";
import { Instruccion } from "./Instruccion";

export class Llamada extends Instruccion{

    constructor(private id:string,private argumentos:Expresion[],linea:number,columna:number){
        super(linea,columna)
    }

    public interpretar(contexto: Contexto, consola: string[]): string | null {
        // 1. Obtener la función
        const simbolo = contexto.obtenerSimbolo(this.id)
        if (simbolo?.tipoSimbolo!=tipoSimbolo.FUNCION) throw new Error("Este id no es de una funcion")
        // Comparar parámetros - cantidad y tipo
         
        const funcion = simbolo.obtenerValor() as Funcion
        const global = contexto.obtenerGlobal()
        const contextoFuncion = new Contexto(global) // Aquí pasamos el contexto global
         
        if (this.argumentos.length!=funcion.getParametros().length) throw new Error("Verifique la cantidad de argumentos")
         
        funcion.getParametros().forEach((parametro,index)=>{
            const exp = this.argumentos[index].interpretar(contexto)
            if (exp === null) {
                throw new Error("La interpretación del argumento es null EN LLAMADA");
            }
            console.log(`Argumento: ${exp.valor}, tipo: ${exp.tipo}; Parámetro esperado: ${parametro.id}, tipo: ${parametro.tipo}`);
            // Declarar variable                
            contextoFuncion.guardarSimbolo(parametro.id,exp,exp.tipo,0,0,tipoSimbolo.VARIABLE)
        })
        // Ejecutar lista de instrucciones
        const instrucciones = funcion.getInstrucciones()
        const resultado = instrucciones.interpretar(contextoFuncion,consola)
        // No devolvemos el resultado aquí
        return resultado;
     }
}