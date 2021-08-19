import React, { useEffect, useState } from 'react';
import './App.css';
import { Game } from '../Game/Game'
import { Login } from '../login/login'
import { createDeck, shuffleDeck } from '../deck.jsx'

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:9090');
let shuffledDeck = shuffleDeck(createDeck());
let response, clientId, gameId, gameStart = false, cardsMap, playerNum, playerCards;

const App = () => {

client.onopen = () => {
  console.log('WebSocket Client Connected');
};

client.onmessage = (message) => {
  response = JSON.parse(message.data);
  clientId = response.clientId;
  if (response.method === "connect") {
    console.log("Client id Set successfully " + clientId)
    gameStart = false
  }
  // created game
  if (response.method === "create") {
    gameId = response.game.id;
    alert("Game was created Set successfully " + gameId)
  }
  if (response.method === "playerJoined") {
    gameId = response.game.id;
    if(response.clientId === clientId){
      playerNum = response.playerNum;
      console.log(`player number is ${playerNum}`)
    }
    console.log(`player ${clientId} has entered game ${gameId}`)
  }
  if (response.method === "updateCards") {
    //gameStart = true;
    cardsMap = response.cardsMap;
    playerCards=cardsMap[playerNum]
    setIsGameStarted(true)
    //console.log(response.cardsMap[response.playerNum]);
  }
  // if (response.method === "updateCards") {
  //   gameStart = true;
  //   setIsGameStarted(false)
  //   cardsMap = response.cardsMap;
  //   console.log(response.cardsMap[response.playerNum]);
  // }
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



  const [isGameStarted, setIsGameStarted] = useState(false);

//   client.onmessage = (message) => {
//     response = JSON.parse(message.data);
//   if (response.method === "updateCards") {
//     //gameStart = true;
//     setIsGameStarted(true)
//     cardsMap = response.cardsMap;
//     console.log(response.cardsMap[response.playerNum]);
//   }
// };


  return (
    <div className="App" >
      {isGameStarted === false ? <Login client={client} createGame={createGame} joinGame={joinGame} />
       : <Game shuffledDeck={shuffledDeck} playerNum = {playerNum} cardsMap={cardsMap}  playerCards={playerCards}/>}
    </div>
  );
}

export default App;
