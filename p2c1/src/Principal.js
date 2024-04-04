import React, { useState } from 'react';

function Principal() {
    const [entrada, setEntrada] = useState('');
    const [consola, setConsola] = useState('');

    const handleEntradaChange = (event) => {
        setEntrada(event.target.value);
    };

    const handleConsolaChange = (event) => {
        setConsola(event.target.value);
    };

    return (
        <div className="container mt-5">
            <div className="row mt-3">
                <div className="col">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Archivo
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button className="dropdown-item" type="button">Crear</button></li>
                        <li><button className="dropdown-item" type="button">Abrir</button></li>
                        <li><button className="dropdown-item" type="button">Guardar</button></li>
                    </ul>
                </div>
                <div className="col">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        Ejecutar
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                        <li><button className="dropdown-item" type="button">Ejecutar</button></li>
                    </ul>
                </div>
                <div className="col">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
                        Reportes
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                        <li><button className="dropdown-item" type="button">Reporte Árbol</button></li>
                        <li><button className="dropdown-item" type="button">Reporte Errores</button></li>
                        <li><button className="dropdown-item" type="button">Reporte Tabla de Símbolos</button></li>
                    </ul>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <label htmlFor="entrada">Entrada</label>
                    <textarea
                        className="form-control"
                        id="entrada"
                        rows="5"
                        value={entrada}
                        onChange={handleEntradaChange}
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className="col">
                    <label htmlFor="consola">Consola</label>
                    <textarea
                        className="form-control"
                        id="consola"
                        rows="5"
                        value={consola}
                        onChange={handleConsolaChange}
                        style={{ resize: 'none' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Principal;
