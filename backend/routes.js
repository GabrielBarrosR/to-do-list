const express = require("express");
const router = express.Router();
const list = require("./models/users.js");

router.get("/list", async (req, res) => {
  try {
    const lists = await list.find();
    res.json(lists);
  } catch (error) {
    res.status(500).json({ erro: "Falha ao consultar as listas" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    const novoUsuario = await list.create({
      titulo,
      descricao,
      done: false,
    });

    res
      .status(201)
      .json({ mensagem: "Lista criado com sucesso!", dados: novoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao adicionar lista" });
  }
});

router.put("/done/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { done } = req.body;

    const atualizardone = await list.findByIdAndUpdate(
      id,
      { done },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(atualizardone);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar a lista" });
  }
});

router.delete("/remove/:id", async (req, res) => {
  try{
    const { id }  = req.params;
    const deletardados = await list.findByIdAndDelete(id);

    res.status(200).json({mensagem: "Lista removida com sucesso"})

  }catch(error){
    res.status(500).json({erro: "Erro ao deletar lista"})
  }
})

router.put('/edit/:id', async (req, res) => {
  try{
    const {id} = req.params;
    const {titulo, descricao} = req.body;

    const atualizardados = await list.findByIdAndUpdate(id, {
      titulo, descricao
    },
    {
      new: true,
      runValidators: true,
      })
    res.status(200).json(atualizardados);
  } catch (error) {
    res.status(500).json({erro: "Erro ao editar lista"})
  }
})
module.exports = router;
