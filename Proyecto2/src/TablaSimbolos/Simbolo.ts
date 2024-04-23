import { TipoDato } from "../Expresion/Resultado";

export class Simbolo {
    public nombre: string;
    public tipo: TipoDato;
    public valor: Object;
    public fila: number;
    public columna: number;
    public tipoSimbolo: tipoSimbolo;

    constructor(nombre: string, tipo: TipoDato, valor: Object, fila: number, columna: number, tipoSimbolo: tipoSimbolo) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
        this.tipoSimbolo = tipoSimbolo;
    }

    //interpretar(consola: string[]): void { consola.push(this.valor + "\n");}
    public obtenerValor():Object{
        return this.valor
    }
    
    public actualizarValor(valor:Object){
        this.valor = valor
    }
    
    public obtenertipoDato() {
        return this.tipo
    }
}

export enum tipoSimbolo {
    VARIABLE, 
    FUNCION,
    VECTOR,
    METODO
}