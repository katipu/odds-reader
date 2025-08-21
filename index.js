const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/odds', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'Missing URL param' });

  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar odds', details: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('API do Odds Reader está ativa!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
