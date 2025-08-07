import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/list")
      .then((res) => res.json())
      .then((data) => setTarefas(data))
      .catch((err) => console.error("❌ Erro ao buscar tarefas:", err));
  }, []);

  const deletardados = async(id) =>{
    try{
      const response = await fetch (`http://localhost:8080/remove/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
      
      setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa._id !== id)
    );
    }catch (error){console.log ("Erro ao deleter lista")}
  }

  const toggleTarefa = async (id, statusatual) => {
    try {
      const response = await fetch(`http://localhost:8080/done/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !statusatual }),
      });

      const tarefaAtualizada = await response.json();

      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((tarefa) =>
          tarefa._id === id ? tarefaAtualizada : tarefa
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Minhas Tarefas</h1>

      <ul className="tarefas">
        {tarefas.map((tarefa) => (
          <li key={tarefa._id} className="tarefa-item">
            <div className="linha-topo">
              <input
                type="checkbox"
                checked={tarefa.done}
                onChange={() => toggleTarefa(tarefa._id, tarefa.done)}
              />
              <strong>{tarefa.titulo}</strong>
            </div>
            <p>{tarefa.descricao}</p>
            <p>Status: {tarefa.done ? "Concluída" : "Pendente"}</p>
            <button onClick={() => deletardados(tarefa._id)}>Remover Lista</button>
          </li>
        ))}
      </ul>

      <button className="botaoadicionar" onClick={() => navigate("/add")}>
        Adicionar
      </button>
    </div>
  );
}

export default App;
