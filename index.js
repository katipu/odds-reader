const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Endpoint principal de odds
app.get('/odds', async (req, res) => {
  const { league } = req.query;
  if (!league) return res.status(400).send('League é obrigatória');

  try {
    const mockOdds = [
      {
        homeTeam: 'Time A',
        awayTeam: 'Time B',
        odds: { home: 2.1, draw: 3.5, away: 3.2 }
      },
      {
        homeTeam: 'Time C',
        awayTeam: 'Time D',
        odds: { home: 1.8, draw: 3.8, away: 4.1 }
      }
    ];
    res.json({ league, matches: mockOdds });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar odds');
  }
});

// Rodar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
