import { Expresion } from "../../Expresion/Expresion";
import { Resultado, TipoDato } from "../../Expresion/Resultado";
import { Bloque } from "../Bloque";
import { Instruccion } from "../Instruccion";

export class Ternario extends Expresion {
    condicion: Expresion
    expresionVerdadera: Expresion
    expresionFalsa: Expresion

    constructor(condicion: Expresion, expresionVerdadera: Expresion, expresionFalsa: Expresion, linea: number, columna: number) {
        super(linea, columna)
        this.condicion = condicion
        this.expresionVerdadera = expresionVerdadera
        this.expresionFalsa = expresionFalsa
    }

    public interpretar(): Resultado {
        const condicion = this.condicion.interpretar()
        if (condicion.tipo != TipoDato.BOOLEANO)
            throw Error("La x no es booleana")
        if (condicion.valor) {
            this.expresionVerdadera.interpretar()
        } else {
            console.log("else ")
            console.log({else:this.expresionFalsa})
            this.expresionFalsa.interpretar()
        }
        return { tipo: TipoDato.NULO, valor: null}
    }
}