"use strict";
class GrafoAST {
    constructor() {
        this.nodos = [];
        this.aristas = [];
    }
    agregarNodo(id, label) {
        this.nodos.push(`${id} [label="${label}"]`);
    }
    agregarArista(idOrigen, idDestino) {
        this.aristas.push(`${idOrigen} -> ${idDestino}`);
    }
    generarDOT() {
        let dot = "digraph AST {\n";
        dot += this.nodos.join("\n") + "\n";
        dot += this.aristas.join("\n") + "\n";
        dot += "}\n";
        return dot;
    }
}
