import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Addlists() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          descricao,
          done: false,
        }),
      });

      if (!response.ok) throw new Error("Erro na requisição");

      await response.json();

      setTitulo("");
      setDescricao("");
      navigate("/"); 
    } catch (error) {
      console.error("Erro ao enviar lista:", error);
      alert("Erro ao enviar lista.");
    }
  };

  return (
    <div className="add-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Adicionar Nova Lista</h2>

        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <textarea
          placeholder="Descrição"
          rows={7}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        ></textarea>

        <button type="submit">Enviar</button>
        <button
          type="button"
          style={{ backgroundColor: "#6c757d", marginTop: "10px" }}
          onClick={() => navigate("/")}
        >
          Voltar
        </button>
      </form>
    </div>
  );
}

export default Addlists;
