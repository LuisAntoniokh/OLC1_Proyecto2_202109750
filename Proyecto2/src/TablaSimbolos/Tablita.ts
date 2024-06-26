import { Simbolo, tipoSimbolo } from "./Simbolo";
import { TipoDato } from "../Expresion/Resultado";

export class Contexto {
    private tabla: Map<string, Simbolo>;
    private padre: Contexto | null;

    constructor(padre: Contexto | null) {
        this.tabla = new Map<string, Simbolo>;
        this.padre = padre;
    }

    public guardarSimbolo(id:string,valor:Object,tipo:TipoDato,fila: number, columna: number,tipoSimbolo:tipoSimbolo){
        const existe = this.tabla.has(id);
        if (!existe){
            this.tabla.set(id, new Simbolo(id,tipo,valor,fila, columna,tipoSimbolo))
            console.log("Variable guardada")
            return 
        }
        throw new Error("La variable ya fue declarada")
    }

    public obtenerSimbolo(id:string):Simbolo | undefined{
        let contexto_actual = this as Contexto | null
        while (contexto_actual!=null){
        const existe = contexto_actual.tabla.has(id);
        if (existe){
            // Obtenemos valor y retornamos
            return contexto_actual.tabla.get(id);
        }
            // Siguiente contexto
            contexto_actual = contexto_actual.padre 
        }
        return undefined
    }

    public actualizarSimbolo(id:string,valor:Simbolo){
        this.tabla.set(id,valor)
    }

    public actualizarTipoSimbolo(id: string, nuevoTipo: TipoDato): void {
        const simbolo = this.obtenerSimbolo(id);
        if (simbolo) {
            simbolo.tipo = nuevoTipo;
            this.actualizarSimbolo(id, simbolo);
        } else {
            throw new Error(`La variable ${id} no existe en el contexto actual`);
        }
    }
    
    public obtenerGlobal():Contexto{
        let contexto = this as Contexto
        while (contexto.padre!=null){
            contexto = contexto.padre
        }
        return contexto
    }

    public obtenerTabla(): { id: string, tipo: string, valor: any, fila: number, columna: number }[] {
            let tabla: { id: string, tipo: string, valor: any, fila: number, columna: number }[] = [];
            this.tabla.forEach((valor, clave) => {
                tabla.push({
                    id: clave,
                    tipo: typeof valor.obtenerValor,
                    valor: valor.valor,
                    fila: valor.fila,
                    columna: valor.columna,
                });
            });
            return tabla;
        }
    
    /*public guardarVariable(id:string, valor: string, tipo: TipoDato): void {
        const existe = this.tabla.has(id);
        if (!existe) {
            this.tabla.set(id, new Simbolo(id, tipo, valor, 0, 0));
        }
        throw new Error(`La variable ${id} ya existe en el contexto actual`);
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
    }*/

}