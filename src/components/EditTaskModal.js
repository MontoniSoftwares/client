import axios from 'axios';
import React, { useState } from 'react';

const EditTaskModal = ({ task, onClose, fetchTasks }) => {
  const [taskName, setTaskName] = useState(task.nome);
  const [cost, setCost] = useState(task.custo);
  const [dueDate, setDueDate] = useState(task.data_limite);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = {
      nome: taskName,
      custo: cost,
      data_limite: dueDate,
    };
    
    try {
      await axios.put(`http://localhost:3001/tarefas/${task.id}`, updatedTask);
      fetchTasks(); // Atualiza a lista de tarefas após editar
      onClose(); // Fecha o modal
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  return (
    <div className="modal">
      <h2>Editar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(parseFloat(e.target.value))}
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditTaskModal;
