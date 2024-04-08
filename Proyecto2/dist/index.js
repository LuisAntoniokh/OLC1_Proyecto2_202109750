"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser = require("../Analizadores/Gramatica");
function interprete(contenido) {
    try {
        const ast = parser.parse(contenido);
        ast.Ejecutar();
        console.log("Análisis finalizado 2");
        return ast.getConsola();
    }
    catch (error) {
        console.error(error);
    }
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5173;
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
