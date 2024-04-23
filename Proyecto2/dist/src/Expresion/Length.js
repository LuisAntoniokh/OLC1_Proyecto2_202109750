"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
const Expresion_1 = require("./Expresion");
const Resultado_1 = require("./Resultado");
class Length extends Expresion_1.Expresion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    interpretar(contexto) {
        const resultado = contexto.obtenerSimbolo(this.id);
        if ((resultado === null || resultado === void 0 ? void 0 : resultado.tipo) === Resultado_1.TipoDato.STRING || (resultado === null || resultado === void 0 ? void 0 : resultado.tipo) === Resultado_1.TipoDato.VECTOR) {
            const valorObjeto = resultado.obtenerValor();
            if ('valor' in valorObjeto) {
                const valor = valorObjeto.valor;
                console.log("valor: ", valor);
                if (typeof valor === 'string' || Array.isArray(valor)) {
                    return { valor: valor.length, tipo: Resultado_1.TipoDato.NUMBER };
                }
            }
        }
        throw new Error("Error en el tipo de dato");
    }
}
exports.Length = Length;
