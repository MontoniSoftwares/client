import axios from 'axios';
import React, { useState } from 'react';
import EditTaskModal from './EditTaskModal';

function TaskList({ tarefas, onTaskUpdated, onTaskDeleted }) {
    const [editingTask, setEditingTask] = useState(null);

    const handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja excluir?")) {
            axios.delete(`http://localhost:3000/tarefas/${id}`)
                .then(onTaskDeleted)
                .catch(error => console.error(error));
        }
    };

    const handleEdit = (tarefa) => {
        setEditingTask(tarefa);
    };

    return (
        <div>
            {tarefas.map(tarefa => (
                <div key={tarefa.id} style={{ backgroundColor: tarefa.custo >= 1000 ? 'yellow' : 'white' }}>
                    <span>{tarefa.nome}</span>
                    <span> - R${tarefa.custo}</span>
                    <span> - {tarefa.data_limite}</span>
                    <button onClick={() => handleEdit(tarefa)}>Editar</button>
                    <button onClick={() => handleDelete(tarefa.id)}>Excluir</button>
                </div>
            ))}

            {editingTask && (
                <EditTaskModal
                    tarefa={editingTask}
                    onClose={() => setEditingTask(null)}
                    onTaskUpdated={onTaskUpdated}
                />
            )}
        </div>
    );
}

export default TaskList;
