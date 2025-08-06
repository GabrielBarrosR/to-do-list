const express = require('express');
const router = express.Router();
const list = require('./models/users.js');


router.get('/list', async (req, res) => {
  try {
    const lists = await list.find();
    res.json(lists);
  } catch (error) {
    res.status(500).json({ erro: 'Falha ao consultar os usuários' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    const novoUsuario = await list.create({
      titulo,
      descricao,
      done: false,
    });

    res.status(201).json({ mensagem: 'Lista criado com sucesso!', dados: novoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao adicionar lista' });
  }
})

router.put('/done/:id', async (req, res) => {
  try{
    const {id} = req.params
    const {done} = req.body
    
    const atualizardone = await list.findByIdAndUpdate(id, {done}, {
      new: true,          
      runValidators: true 
    });
    res.status(200).json(atualizardone);
    } catch (error) {res.status(500).json ({erro: 'Erro ao atualizar a lista'})} 
})

module.exports = router;
