import { TipoDato } from "../Expresion/Resultado";
import { Instruccion } from "../Instruccion/Instruccion";
import { tipoSimbolo } from "../TablaSimbolos/Simbolo";
import { Contexto } from "../TablaSimbolos/Tablita";
import { Vector } from "./Vector";

export class DeclaracionVector extends Instruccion {
    private id: string;
    private dimensions: number[];
    private defaultValue: any;
    private tipoDato: TipoDato;

    constructor(id: string, dimensions: number[], defaultValue: any, tipoDato: TipoDato, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.dimensions = dimensions;
        this.defaultValue = defaultValue;
        this.tipoDato = tipoDato;
    }

    public interpretar(contexto: Contexto, consola: string[]): null | string {
        // Crear un nuevo vector con las dimensiones y el valor por defecto
        const vector = new Vector(this.dimensions, this.defaultValue);

        // Guardar el vector en el contexto
        contexto.guardarSimbolo(this.id, vector, this.tipoDato, this.line, this.column, tipoSimbolo.VECTOR);
        return null;
    }
}