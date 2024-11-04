import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm'; // Importe o novo componente de adição
import EditTaskModal from './EditTaskModal'; // Certifique-se de que o caminho está correto

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false); // Controle do formulário de adição

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:3001/tarefas');
    setTasks(response.data);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
  };

  const closeEditModal = () => {
    setEditingTask(null);
    fetchTasks(); // Recarrega as tarefas após edição
  };

  const deleteTask = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      await axios.delete(`http://localhost:3001/tarefas/${id}`);
      fetchTasks();
    }
  };

  const moveTaskUp = async (id) => {
    const currentTask = tasks.find(task => task.id === id);
    const aboveTask = tasks.find(task => task.ordem === currentTask.ordem - 1);

    if (aboveTask) {
      await axios.put(`http://localhost:3001/tarefas/${currentTask.id}`, { ordem: aboveTask.ordem });
      await axios.put(`http://localhost:3001/tarefas/${aboveTask.id}`, { ordem: currentTask.ordem });
      fetchTasks();
    }
  };

  const moveTaskDown = async (id) => {
    const currentTask = tasks.find(task => task.id === id);
    const belowTask = tasks.find(task => task.ordem === currentTask.ordem + 1);
  
    if (belowTask) {
      await axios.put(`http://localhost:3001/tarefas/${currentTask.id}`, { ordem: belowTask.ordem });
      await axios.put(`http://localhost:3001/tarefas/${belowTask.id}`, { ordem: currentTask.ordem });
      fetchTasks();
    }
  };

  const handleTaskAdded = () => {
    fetchTasks(); // Recarrega a lista de tarefas após a inclusão
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <button onClick={() => setIsAddTaskFormOpen(true)}>Incluir Nova Tarefa</button>
      {isAddTaskFormOpen && (
        <AddTaskForm onTaskAdded={handleTaskAdded} onClose={() => setIsAddTaskFormOpen(false)} />
      )}
      <table>
        <thead>
          <tr>
            <th>Nome da Tarefa</th>
            <th>Custo (R$)</th>
            <th>Data Limite</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} style={{ backgroundColor: task.custo >= 1000 ? 'yellow' : 'white' }}>
              <td>{task.nome}</td>
              <td>{task.custo}</td>
              <td>{task.data_limite}</td>
              <td>
                <button onClick={() => moveTaskUp(task.id)}>⬆️</button>
                <button onClick={() => moveTaskDown(task.id)}>⬇️</button>
                <button onClick={() => openEditModal(task)}>✏️ Editar</button>
                <button onClick={() => deleteTask(task.id)}>🗑️ Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTask && (
        <EditTaskModal 
          task={editingTask} 
          onClose={closeEditModal} 
          fetchTasks={fetchTasks} 
        />
      )}
    </div>
  );
};

export default TaskList;
