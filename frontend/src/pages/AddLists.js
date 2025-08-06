import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Addlists() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate(); 
  

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('http://localhost:8080/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: titulo,
          descricao: descricao,
          done: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const resultado = await response.json();
      console.log('Resposta do servidor:', resultado);

      setTitulo('');
      setDescricao('');
      alert('Lista enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar lista:', error);
      alert('Erro ao enviar lista.');
    }
  };

  return (
    <div>
      <h1 className="titleaddlist">Adicionar Nova Lista</h1>
      <form className="newlist" onSubmit={handleSubmit}>
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
      </form>
      <button onClick={() => navigate('/')}>Voltar</button>
    </div>
  );
}

export default Addlists;
