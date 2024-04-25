import { Request, Response } from "express"

const parser = require("../Analizadores/Gramatica")

function interprete(contenido:string){
  try {
      // Eliminar comentarios antes de analizar el contenido
      contenido = eliminarComentarios(contenido);
      const ast = parser.parse(contenido)
      ast.Ejecutar()
      console.log("Análisis finalizado")
      return ast.getConsola()
  } catch (error) {
      console.error(error)
  }
}

function eliminarComentarios(contenido: string) {
  contenido = contenido.replace(/\/\/.*$/gm, '');
  contenido = contenido.replace(/\/\*[\s\S]*?\*\//g, '');
  return contenido;
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.post('/interpretar', (req:Request, res:Response) => {
  const contenido = req.body.contenido
  const interpretado = interprete(contenido)
  res.json({resultado:interpretado})
})

app.get('/', (req:Request, res:Response) => {
    res.send("Hola mundo")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})