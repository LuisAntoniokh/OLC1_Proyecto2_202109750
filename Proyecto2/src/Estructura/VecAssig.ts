import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "../Instruccion/Instruccion";
import { Contexto } from "../TablaSimbolos/Tablita";
import { Vector } from "./Vector";

export class AsignacionVector extends Instruccion {
    private id: string;
    private indices: Expresion[];
    private value: Expresion;

    constructor(id: string, indices: Expresion[], value: Expresion, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.indices = Array.isArray(indices) ? indices : [indices];
        this.value = value;
    }

    public interpretar(contexto: Contexto, consola: string[]): null {
        // Obtener el símbolo del contexto
        let simbolo = contexto.obtenerSimbolo(this.id);

        // Comprobar que el símbolo existe
        if (!simbolo) {
            throw new Error(`La variable ${this.id} no existe en el contexto actual`);
        }

        // Comprobar que el símbolo es un vector
        if (!(simbolo.valor instanceof Vector)) {
            throw new Error(`La variable ${this.id} no es un vector`);
        }

        // Interpretar los índices de acceso
        let evaluatedIndices = this.indices.map(index => index.interpretar(contexto).valor);

        // Interpretar el valor a asignar
        if (this.value !== null) {
            let evaluatedValue = this.value.interpretar(contexto).valor;
    
            // Acceder al vector y asignar el valor
            let vector = simbolo.valor as Vector;
            vector.set(evaluatedIndices, evaluatedValue);
    
            // Imprimir un mensaje de confirmación
            console.log(`Se ha asignado el valor ${evaluatedValue} en el vector ${this.id} con índices ${evaluatedIndices}`);
        } else {
            throw new Error(`El valor a asignar en el vector ${this.id} es null`);
        }
        return null;
    }
}