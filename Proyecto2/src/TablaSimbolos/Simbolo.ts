export class Simbolo {
    public nombre: string;
    public tipo: string;
    public valor: any;
    public fila: number;
    public columna: number;

    constructor(nombre: string, tipo: string, valor: any, fila: number, columna: number) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }
}