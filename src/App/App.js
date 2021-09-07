import React, { useEffect, useState } from 'react';
import './App.css';
import { Game } from '../Game/Game'
import { Login } from '../login/login'
import { createGame, joinGame } from '../login/loginFunctions.js'

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:9090');
let response, clientId, gameId, cardsMap, playerNum, playerCards, winnedCards, turn;

const App = () => {

  const [turnState,setTurn] = useState('P1')
  const [cardsMapState,setCardsMap] = useState({})
  const [winnedCardsState,setWinnedCards] = useState({})
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSuitBetting, setIsSuitBetting] = useState(false);
  const [isNumBetting, setIsNumBetting] = useState(false);

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
      setWinnedCards(response.winnedCards);
      setTurn(response.turn);

      setIsGameStarted(true)
    }

    if (response.method === "suitBet") {
      turn = response.turn;
      setIsSuitBetting(true);
    }
  };


  // const createGame = () => {
  //   let payLoad = {
  //     "method": "create",
  //     "clientId": clientId
  //   }
  //   client.send(JSON.stringify(payLoad));
  // }
  // const joinGame = () => {
  //   gameId = document.getElementById("gameIdInput").value;
  //   let payLoad = {
  //     "method": "join",
  //     "clientId": clientId,
  //     "gameId": gameId
  //   }
  //   client.send(JSON.stringify(payLoad));
  // }

  const SendSuitBet = () => {
    
  }



  return (
    <div className="App" >
      {isGameStarted === false ? <Login client={client} createGame={createGame(client,clientId)} joinGame={joinGame(client,clientId)} />
        : <Game client={client} playerNum={playerNum} cardsMap={cardsMapState} winnedCards={winnedCardsState} turn={turnState} isSuitBetting={isSuitBetting} />}
    </div>
  );
}

export default App;
