"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamada = void 0;
const Simbolo_1 = require("../TablaSimbolos/Simbolo");
const Tablita_1 = require("../TablaSimbolos/Tablita");
const Instruccion_1 = require("./Instruccion");
class Llamada extends Instruccion_1.Instruccion {
    constructor(id, argumentos, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.argumentos = argumentos;
    }
    interpretar(contexto, consola) {
        // 1. Obtener la función
        const simbolo = contexto.obtenerSimbolo(this.id);
        if ((simbolo === null || simbolo === void 0 ? void 0 : simbolo.tipoSimbolo) != Simbolo_1.tipoSimbolo.FUNCION)
            throw new Error("Este id no es de una funcion");
        // Comparar parámetros - cantidad y tipo
        const funcion = simbolo.obtenerValor();
        const global = contexto.obtenerGlobal();
        const contextoFuncion = new Tablita_1.Contexto(global); // Aquí pasamos el contexto global
        if (this.argumentos.length != funcion.getParametros().length)
            throw new Error("Verifique la cantidad de argumentos");
        funcion.getParametros().forEach((parametro, index) => {
            const exp = this.argumentos[index].interpretar(contexto);
            if (exp === null) {
                throw new Error("La interpretación del argumento es null EN LLAMADA");
            }
            console.log(`Argumento: ${exp.valor}, tipo: ${exp.tipo}; Parámetro esperado: ${parametro.id}, tipo: ${parametro.tipo}`);
            // Declarar variable                
            contextoFuncion.guardarSimbolo(parametro.id, exp, exp.tipo, 0, 0, Simbolo_1.tipoSimbolo.VARIABLE);
        });
        // Ejecutar lista de instrucciones
        const instrucciones = funcion.getInstrucciones();
        const resultado = instrucciones.interpretar(contextoFuncion, consola);
        // No devolvemos el resultado aquí
        return resultado;
    }
}
exports.Llamada = Llamada;
