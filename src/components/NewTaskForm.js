import axios from 'axios';
import React, { useState } from 'react';

function NewTaskForm({ onTaskAdded }) {
    const [nome, setNome] = useState('');
    const [custo, setCusto] = useState('');
    const [data_limite, setDataLimite] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/tarefas', { nome, custo, data_limite })
            .then(() => {
                setNome('');
                setCusto('');
                setDataLimite('');
                onTaskAdded();
            })
            .catch(error => alert(error.response.data.error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da Tarefa" required />
            <input value={custo} onChange={(e) => setCusto(e.target.value)} placeholder="Custo" required />
            <input value={data_limite} onChange={(e) => setDataLimite(e.target.value)} placeholder="Data Limite" required />
            <button type="submit">Adicionar Tarefa</button>
        </form>
    );
}

export default NewTaskForm;
