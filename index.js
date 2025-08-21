const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Carrega a credencial JSON da conta de serviço
const auth = new google.auth.GoogleAuth({
  keyFile: 'credencial.json', // <- renomeie o arquivo .json baixado para isso
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const SPREADSHEET_ID = '1IGWSv6lJUhx-yvOzq5XsjTcPOPdsfJStAbGl1BRZxRU';

app.post('/registrar-aposta', async (req, res) => {
  try {
    const {
      data,
      jogo,
      campeonato,
      mercado,
      odd,
      stake,
      resultado,
      classificacao,
      comentario
    } = req.body;

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Apostas!A2',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[
          data,
          jogo,
          campeonato,
          mercado,
          odd,
          stake,
          resultado,
          classificacao,
          comentario
        ]]
      }
    });

    res.status(200).json({ message: 'Aposta registrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar aposta:', error);
    res.status(500).send('Erro ao registrar aposta');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
