const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
app.use(cors());
app.use(express.json());

// Autenticação com Google Sheets via variáveis de ambiente
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

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

// Novo endpoint para logar odds
app.post('/log-odds', async (req, res) => {
  try {
    const { league, matches } = req.body;
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const rows = matches.map(match => [
      new Date().toISOString(),
      league,
      match.homeTeam,
      match.awayTeam,
      match.odds.home,
      match.odds.draw,
      match.odds.away
    ]);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Apostas!A2',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: rows }
    });

    res.status(200).json({ message: 'Odds logadas com sucesso!' });
  } catch (error) {
    console.error('Erro ao logar odds:', error);
    res.status(500).send('Erro ao logar odds');
  }
});

// Rodar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
