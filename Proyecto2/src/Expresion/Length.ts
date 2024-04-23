import { Contexto } from "../TablaSimbolos/Tablita";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Resultado";


export class Length extends Expresion{
    id: string;

    constructor(id: string, linea: number, columna: number){
        super(linea,columna);
        this.id = id;
    }

    public interpretar(contexto: Contexto): Resultado {
        const resultado = contexto.obtenerSimbolo(this.id);
        if (resultado?.tipo === TipoDato.STRING || resultado?.tipo === TipoDato.VECTOR) {
            const valorObjeto = resultado.obtenerValor();
            if ('valor' in valorObjeto) {
                const valor = valorObjeto.valor;
                console.log("valor: ", valor);
                if (typeof valor === 'string' || Array.isArray(valor)) {
                    return { valor: valor.length, tipo: TipoDato.NUMBER };
                }
            }
        }
        throw new Error("Error en el tipo de dato");
    }

}