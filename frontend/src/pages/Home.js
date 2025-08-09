import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editandoId, setEditandoId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/list")
      .then((res) => res.json())
      .then((data) => setTarefas(data))
      .catch((err) => console.error("❌ Erro ao buscar tarefas:", err));
  }, []);

  const deletardados = async (id) => {
    try {
      await fetch(`http://localhost:8080/remove/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      setTarefas((tarefasAtuais) =>
        tarefasAtuais.filter((tarefa) => tarefa._id !== id)
      );
    } catch (error) {
      console.log("Erro ao deleter lista");
    }
  };

  const iniciarEdicao = (tarefa) => {
    setEditandoId(tarefa._id);
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao);
  };

  const cancelarEdicao = () => {
    setEditandoId("");
    setTitulo("");
    setDescricao("");
  };

  const salvarEdicao = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descricao }),
      });
      const tarefaAtualizada = await response.json();
      setTarefas((tarefasAtuais) =>
        tarefasAtuais.map((tarefa) =>
          tarefa._id === id ? tarefaAtualizada : tarefa
        )
      );
      cancelarEdicao();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

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
            <div className="tarefa-conteudo">
              <div className="linha-topo">
                <input
                  type="checkbox"
                  checked={tarefa.done}
                  onChange={() => toggleTarefa(tarefa._id, tarefa.done)}
                  disabled={editandoId === tarefa._id}
                />
                {editandoId === tarefa._id ? (
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                ) : (
                  <strong>{tarefa.titulo}</strong>
                )}
              </div>
              {editandoId === tarefa._id ? (
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              ) : (
                <p>{tarefa.descricao}</p>
              )}
              <p>Status: {tarefa.done ? "Concluída" : "Pendente"}</p>
              <button
                className="btn-remove"
                onClick={() => deletardados(tarefa._id)}
                disabled={editandoId === tarefa._id}
              >
                Remover Lista
              </button>
            </div>
            {editandoId === tarefa._id ? (
              <>
                <button className="btn-edit" onClick={() => salvarEdicao(tarefa._id)}>
                  Salvar
                </button>
                <button className="btn-edit" onClick={cancelarEdicao}>
                  Cancelar
                </button>
              </>
            ) : (
              <button className="btn-edit" onClick={() => iniciarEdicao(tarefa)}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            )}
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