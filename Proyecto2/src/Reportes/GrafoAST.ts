class GrafoAST {
    private nodos: string[] = [];
    private aristas: string[] = [];

    agregarNodo(id: string, label: string) {
        this.nodos.push(`${id} [label="${label}"]`);
    }

    agregarArista(idOrigen: string, idDestino: string) {
        this.aristas.push(`${idOrigen} -> ${idDestino}`);
    }

    generarDOT(): string {
        let dot = "digraph AST {\n";
        dot += this.nodos.join("\n") + "\n";
        dot += this.aristas.join("\n") + "\n";
        dot += "}\n";
        return dot;
    }
}