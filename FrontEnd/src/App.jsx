import React, { useRef, useState } from 'react'
import './App.css'
import { EditorT } from '../Componentes/Editor'

function App() {
  const [editorContent, setEditorContent] = useState('');
  const fileInputRef = useRef(null);

  const handleCreateFile = () => {
    window.open('http://localhost:5173/interpretar', '_blank');
  };
  
  const handleOpenFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setEditorContent(e.target.result);
      reader.readAsText(file);
    }
  };

  const handleSaveFile = () => {
    const blob = new Blob([editorContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'file.sc';
    link.click();
  };

  return (
    <>
      <h1>Interfaz</h1>
      <button onClick={handleCreateFile}>Crear Archivo</button>
      <input
        type="file"
        accept=".sc"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleOpenFile}
      />
      <button onClick={() => fileInputRef.current.click()}>Abrir Archivo</button>
      <button onClick={handleSaveFile}>Guardar Archivo</button>
      <button>Reporte de Errores</button>
      <button>Generar Árbol AST</button>
      <button>Reporte de Tabla de Símbolos</button>
      <EditorT value={editorContent} onChange={setEditorContent} />
    </>
  );
}

export default App;