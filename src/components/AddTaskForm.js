// AddTaskForm.js
import axios from 'axios';
import React, { useState } from 'react';

const AddTaskForm = ({ onTaskAdded, onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [cost, setCost] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        nome: taskName,
        custo: parseFloat(cost),
        data_limite: dueDate,
      };
      const response = await axios.post('http://localhost:3001/tarefas', newTask);
      console.log('Tarefa adicionada:', response.data);
      onTaskAdded(); // Chama a função para atualizar a lista de tarefas
      onClose(); // Fecha o formulário
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  return (
    <div>
      <h2>Adicionar Nova Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome da Tarefa"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Custo (R$)"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit">Adicionar Tarefa</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
