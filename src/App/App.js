import React, { useEffect, useState } from 'react';
import './App.css';
import { Game } from '../Game/Game'
import { Login } from '../login/login'

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:9090');
let response, clientId, gameId, cardsMap, playerNum, playerCards, winnedCards, turn;

const App = () => {

  const [turnState,setTurn] = useState('P1')
  const [cardsMapState,setCardsMap] = useState({})
  const [isGameStarted, setIsGameStarted] = useState(false);

  client.onopen = () => {
    console.log('WebSocket Client Connected');
  };

  client.onmessage = (message) => {
    response = JSON.parse(message.data);
    if (response.method === "connect") {
      clientId = response.clientId;
      console.log("Client id Set successfully " + clientId)
    }
    // created game
    if (response.method === "create") {
      gameId = response.game.id;
      playerNum = response.playerNum;
      alert("Game was created Set successfully " + gameId)
    }
    if (response.method === "playerJoined") {
      gameId = response.game.id;
      if (response.clientId === clientId) {
        playerNum = response.playerNum;
        console.log(`player number is ${playerNum}`)
      }
      console.log(`player ${clientId} has entered game ${gameId}`)
    }
    if (response.method === "updateCards") {
      setCardsMap(response.cardsMap);
      // playerCards=cardsMap[playerNum]
      winnedCards = response.winCards;
      setTurn(response.turn);

      setIsGameStarted(true)
    }

    if (response.method === "suitBet") {
      turn = response.turn;
    }
  };


  const createGame = () => {
    let payLoad = {
      "method": "create",
      "clientId": clientId
    }
    client.send(JSON.stringify(payLoad));
  }
  const joinGame = () => {
    gameId = document.getElementById("gameIdInput").value;
    let payLoad = {
      "method": "join",
      "clientId": clientId,
      "gameId": gameId
    }
    client.send(JSON.stringify(payLoad));
  }


  return (
    <div className="App" >
      {isGameStarted === false ? <Login client={client} createGame={createGame} joinGame={joinGame} />
        : <Game client={client} playerNum={playerNum} cardsMap={cardsMapState} winnedCards={winnedCards} turn={turnState} />}
    </div>
  );
}

export default App;
