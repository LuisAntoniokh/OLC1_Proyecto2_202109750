"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_IF = void 0;
const Resultado_1 = require("../../Expresion/Resultado");
const Instruccion_1 = require("../Instruccion");
class FN_IF extends Instruccion_1.Instruccion {
    constructor(condicion, bloqueIf, bloqueElse, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.bloqueIf = bloqueIf;
        this.bloqueElse = bloqueElse;
    }
    interpretar(contexto, consola) {
        var _a;
        const condicion = this.condicion.interpretar(contexto);
        if (condicion.tipo != Resultado_1.TipoDato.BOOLEANO)
            throw Error("La condicion no es booleana");
        if (condicion.valor) {
            const retorno = this.bloqueIf.interpretar(contexto, consola);
            console.log(retorno);
            if (retorno)
                return retorno;
        }
        else {
            console.log("else");
            console.log({ else: this.bloqueElse });
            const retorno = (_a = this.bloqueElse) === null || _a === void 0 ? void 0 : _a.interpretar(contexto, consola);
            if (retorno)
                return retorno;
        }
        return null;
    }
}
exports.FN_IF = FN_IF;
