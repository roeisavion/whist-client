import React, { useEffect, useState } from 'react';
import './App.css';
import { Game } from '../Game/Game'
import { Login } from '../login/login'
import { createGame, joinGame } from '../login/loginFunctions.js'
import {errorHandler} from './errorHandler'

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:9090');
let response, clientId, gameId, cardsMap, playerNum, playerCards, winnedCards, turn, suitBet, nickname;

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
        nickname = response.nickname;
        console.log(`player number is ${playerNum}`)
        console.log(`player nickname is ${nickname}`)
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
      nickname = response.nickname;
      setIsSuitBetting(true);
      suitBet = response.suitBet
      // suitBet ? alert(suitBet) : null ///need to parse suit bet, and to add nicknames
      if(suitBet){
        alert(`${nickname} has bet ${suitBet[response.playerPlayed]}`)
      }
      // need to alert if restart
    }
    if (response.method === "error") {
      // errorHandler(response.massage)
      alert(response.massage)
    }
  };


  const createGame = () => {
    nickname = document.getElementById("nicknameInput").value;
    if(nickname){
      let payLoad = {
        "method": "create",
        nickname,
        clientId
      }
      client.send(JSON.stringify(payLoad));
    }
    else{
      alert("must send nickName")
    }
  }
  const joinGame = () => {
    gameId = document.getElementById("gameIdInput").value;
    nickname = document.getElementById("nicknameInput").value;
    if (!!nickname && !!gameId){
      let payLoad = {
        "method": "join",
        clientId,
        nickname,
        gameId
      }
      client.send(JSON.stringify(payLoad));
    }
    if(!gameId){
      alert("must send gameID")
    }
    if(!nickname){
      alert("must send nickName")
    }
  }



  return (
    <div className="App" >
      {isGameStarted === false ? <Login client={client} createGame={createGame} joinGame={joinGame} client={client} clientId={clientId} />
        : <Game client={client} clientId={clientId} playerNum={playerNum} cardsMap={cardsMapState} winnedCards={winnedCardsState} turn={turnState} isSuitBetting={isSuitBetting} />}
    </div>
  );
}

export default App;
