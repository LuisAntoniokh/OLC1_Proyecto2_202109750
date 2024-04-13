"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Instruccion_1 = require("../Instruccion");
class Switch extends Instruccion_1.Instruccion {
    constructor(expresion, cases, defaultVAL) {
        super(0, 0);
        this.expresion = expresion;
        this.cases = cases || [];
        this.defaultVAL = defaultVAL;
    }
    interpretar(consola) {
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
exports.Switch = Switch;
