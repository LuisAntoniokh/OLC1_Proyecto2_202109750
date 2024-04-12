"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Instruccion_1 = require("../Instruccion");
class Switch extends Instruccion_1.Instruccion {
    constructor(expresion, cases, defaultVAL) {
        super(0, 0);
        this.expresion = expresion;
        this.cases = cases;
        this.defaultVAL = defaultVAL;
    }
    interpretar(consola) {
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
exports.Switch = Switch;
