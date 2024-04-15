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
    interpretar(contexto, consola) {
        const valor = this.expresion.interpretar(contexto);
        let matched = false;
        for (const caso of this.cases) {
            const result = caso.expresion.interpretar(contexto);
            if (!matched && valor.valor == result.valor) {
                matched = true;
                const messi = caso.interpretar(contexto, consola);
                if (messi === null || messi === void 0 ? void 0 : messi.includes("break")) {
                    break;
                }
                else {
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
exports.Switch = Switch;
