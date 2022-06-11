const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(cors({
    origin: "*"
}))

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api/:game', async (request, response) => {
  const game = request.params.game || 'cricket';
  const game_url = `http://34.93.64.47:3000/api/list/${game}`;
  const game_response = await fetch(game_url);
  const game_data = await game_response.json();

  response.json(game_data);
});

app.get('/api/:game/:gameId', async (request, response) => {
    const game = request.params.game;
    const gameId = request.params.gameId;
    const game_url = `http://34.93.64.47:3000/api/ods/${game}?gameid=${gameId}`;
    const game_response = await fetch(game_url);
    const game_data = await game_response.json();
  
    response.json(game_data);
});

app.get('/health', async(req, res) => {
  res.json({
    status: 'ok'
  })
});