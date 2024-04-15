import { Expresion } from "../../Expresion/Expresion";
import { Case } from "../Case";
import { Default } from "../Default";
import { Instruccion } from "../Instruccion";
import { Contexto } from "../../TablaSimbolos/Tablita";
import { Break } from "./Break";

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

    public interpretar(contexto: Contexto, consola: string[]): null | string {
        const valor = this.expresion.interpretar(contexto);
        let matched = false;
        for (const caso of this.cases) {
            const result = caso.expresion.interpretar(contexto);
            if (!matched && valor.valor == result.valor) {
                matched = true;
                const messi = caso.interpretar(contexto, consola);
                if(messi?.includes("break")){
                    break;
                } else {
                    continue;
                }
            }
        }
    
        if (!matched && this.defaultVAL) {
            this.defaultVAL.interpretar(contexto, consola);
        }
    
        return null;
    }
}