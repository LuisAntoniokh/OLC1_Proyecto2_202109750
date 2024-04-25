"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser = require("../Analizadores/Gramatica");
function interprete(contenido) {
    try {
        // Eliminar comentarios antes de analizar el contenido
        contenido = eliminarComentarios(contenido);
        const ast = parser.parse(contenido);
        ast.Ejecutar();
        console.log("Análisis finalizado");
        return ast.getConsola();
    }
    catch (error) {
        console.error(error);
    }
}
function eliminarComentarios(contenido) {
    contenido = contenido.replace(/\/\/.*$/gm, '');
    contenido = contenido.replace(/\/\*[\s\S]*?\*\//g, '');
    return contenido;
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.post('/interpretar', (req, res) => {
    const contenido = req.body.contenido;
    const interpretado = interprete(contenido);
    res.json({ resultado: interpretado });
});
app.get('/', (req, res) => {
    res.send("Hola mundo");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
