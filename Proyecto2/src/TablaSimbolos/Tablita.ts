import { Simbolo } from "./Simbolo";
import { Instruccion } from "../Instruccion/Instruccion";

export class TablaSimbolos {
    private tabla: Map<string, Simbolo>;

    constructor() {
        this.tabla = new Map<string, Simbolo>();
    }

    public guardar(nombre: string, tipo: string, valor: any, fila: number, columna: number): void {
        let simbolo = new Simbolo(nombre, tipo, valor, fila, columna);
        this.tabla.set(nombre, simbolo);
    }

    public obtener(nombre: string): Simbolo | undefined {
        return this.tabla.get(nombre);
    }

    public interpretar(instrucciones: Instruccion): void {
        let nombresVariables: string[] = Array.from(this.tabla.keys());
        instrucciones.interpretar(nombresVariables);
    }

    public imprimir(): void {
        this.tabla.forEach((simbolo, nombre) => {
            console.log(`Nombre: ${nombre}, Tipo: ${simbolo.tipo}, Valor: ${simbolo.valor}`);
        });
    }
}