import { Expresion } from "../../Expresion/Expresion";
import { Case } from "../Case";
import { Default } from "../Default";
import { Instruccion } from "../Instruccion";

export class Switch extends Instruccion {
    expresion: Expresion;
    cases: Case[];
    defaultVAL: Default | null;

    constructor(expresion: Expresion, cases: Case[], defaultVAL: Default | null) {
        super(0, 0);
        this.expresion = expresion;
        this.cases = cases || [];
        this.defaultVAL = defaultVAL;
    }

    public interpretar(consola: string[]): null {
        const valor = this.expresion.interpretar();
        let matched = false;
        for (const caso of this.cases) {
            const result = caso.expresion.interpretar();
            if (!matched && valor.valor == result.valor) {
                matched = true;
            }
            if (matched) {
                caso.interpretar(consola);
                if (caso.hasbreak) {
                    break;
                }
            }
        }

        if (!matched && this.defaultVAL) {
            this.defaultVAL.interpretar(consola);
        }

        return null;
    }
}