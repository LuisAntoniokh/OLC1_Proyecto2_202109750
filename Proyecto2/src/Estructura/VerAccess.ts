import { Expresion } from "../Expresion/Expresion";
import { Resultado } from "../Expresion/Resultado";
import { Contexto } from "../TablaSimbolos/Tablita";
import { Vector } from "./Vector";

export class AccesoVector extends Expresion {
    private id: string;
    private indices: Expresion[];

    constructor(id: string, indices: Expresion[], line: number, column: number) {
        super(line, column);
        this.id = id;
        this.indices = indices;
    }

    public interpretar(contexto: Contexto): Resultado {
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

        // Acceder al valor en el vector
        let vector = simbolo.obtenerValor()  as Vector;
        let valor = vector.get(evaluatedIndices);

        // Extraer la propiedad exp1 si el valor es un objeto
        let valorString = typeof valor === 'object' ? valor.exp1 : valor;

        // Imprimir el valor
        console.log(`Se ha accedido al valor ${valorString} en el vector ${this.id} con índices ${evaluatedIndices}`);

        return { valor: valorString, tipo: valor.tipo };
    }
}