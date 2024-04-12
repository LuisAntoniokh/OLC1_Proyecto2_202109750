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
        this.cases = cases;
        this.defaultVAL = defaultVAL;
    }

    public interpretar(consola: string[]): null {
        const valor = this.expresion.interpretar();

        for (const caso of this.cases) {
            if (caso.expresion.interpretar() === valor) {
                caso.interpretar(consola);
                console.log("break ");
                return null;
            }
        }

        if (this.defaultVAL) {
            this.defaultVAL.interpretar(consola);
        }

        return null;
    }
}