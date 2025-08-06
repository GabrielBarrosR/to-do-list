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

module.exports = router;
