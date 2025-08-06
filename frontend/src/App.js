import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/list')
      .then((res) => res.json())
      .then((data) => { setTarefas(data)})
      .catch((err) => console.error('❌ Erro ao buscar tarefas:', err));
  }, []); 

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Minhas Tarefas</h1>

      <ul className="tarefas">
        {tarefas.map((tarefa) => (
          <li key={tarefa._id} className="tarefa-item">
            <div className="linha-topo">
              <input type="checkbox" checked={tarefa.done} readOnly />
              <strong>{tarefa.titulo}</strong>
            </div>
            <p>{tarefa.descricao}</p>
            <p>Status: {tarefa.done ? 'Concluída' : 'Pendente'}</p>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
