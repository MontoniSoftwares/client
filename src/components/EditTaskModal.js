import axios from 'axios';
import React, { useEffect, useState } from 'react';

function EditTaskModal({ tarefa, onClose, onTaskUpdated }) {
    const [nome, setNome] = useState(tarefa.nome);
    const [custo, setCusto] = useState(tarefa.custo);
    const [dataLimite, setDataLimite] = useState(tarefa.data_limite);

    useEffect(() => {
        setNome(tarefa.nome);
        setCusto(tarefa.custo);
        setDataLimite(tarefa.data_limite);
    }, [tarefa]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.put(`http://localhost:3000/tarefas/${tarefa.id}`, {
            nome,
            custo,
            data_limite: dataLimite,
        })
        .then(() => {
            onTaskUpdated();
            onClose();
        })
        .catch((error) => {
            alert(error.response.data.error);
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Editar Tarefa</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome da Tarefa:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />

                    <label>Custo (R$):</label>
                    <input
                        type="number"
                        value={custo}
                        onChange={(e) => setCusto(e.target.value)}
                        required
                    />

                    <label>Data Limite:</label>
                    <input
                        type="date"
                        value={dataLimite}
                        onChange={(e) => setDataLimite(e.target.value)}
                        required
                    />

                    <button type="submit">Salvar</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
}

export default EditTaskModal;
