import React, { useEffect, useState } from 'react';
import './App.css';
import { Game } from '../Game/Game'
import { Login } from '../login/login'
import { createGame, joinGame } from '../login/loginFunctions.js'
import { errorHandler } from './errorHandler'

import { w3cwebsocket as W3CWebSocket } from "websocket";

// const client = new W3CWebSocket('ws://127.0.0.1:9091');
const client = new W3CWebSocket('ws://powerful-plains-99715.herokuapp.com');
let response, clientId, gameId, playerNum, nickname;
const App = () => {

  const [turnState, setTurn] = useState('P1')
  const [cardsMapState, setCardsMap] = useState({})
  const [scoreMapState, setScoreMap] = useState({})
  const [suitBetState, setsuitBet] = useState(undefined)
  const [numBetState, setNumBets] = useState(undefined)
  const [winnedCardsState, setWinnedCards] = useState({})
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSuitBetting, setIsSuitBetting] = useState(false);
  const [isNumBetting, setIsNumBetting] = useState(false);
  const [minBetState, setminBet] = useState([]);
  const [sliceingSuitState, setSliceingSuit] = useState("");
  const [betWinnerState, setBetWinner] = useState("");
  const [inGame, setInGame] = useState(false);

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
      gameId = response.gameId;
      playerNum = response.playerNum;
      setInGame(true);
      alert("Game was created Set successfully " + gameId)
    }

    if (response.method === "leftGame") {
      if (response.clientId === clientId) {
        setInGame(false);
      }
      alert(response.nickname + " has left the game")
    }

    if (response.method === "playerJoined") {
      gameId = response.game.id;
      if (response.clientId === clientId) {
        playerNum = response.playerNum;
        nickname = response.nickname;
        setInGame(true);
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
      setTurn(response.turn);
      nickname = response.nickname;
      setIsSuitBetting(true);
      setsuitBet(response.suitBet)
      console.log("aaa")
    }
    if (response.method === "error") {
      alert(response.massage)
    }
    if (response.method === "numBet") {
      setTurn(response.turn);
      nickname = response.nickname;
      setIsSuitBetting(false);
      setNumBets(response.numBets)
      response.finishBetting ? setIsNumBetting(false) : setIsNumBetting(true);
      if (response.minBet) {
        setminBet([response.minBet,response.betWinner]);
        setSliceingSuit(response.sliceingSuit);
        // setBetWinner(response.betWinner);
      }
    }
    if (response.method === "score") {
      setScoreMap(response.scoreMap)
      alert("your score is: " + response.scoreMap[playerNum])
    }
  };


  const createGame = () => {
    // let nicknameElemnt = document.getElementById("nicknameInput");
    nickname = document.getElementById("nicknameInput").value;
    if (nickname) {
      let payLoad = {
        "method": "create",
        nickname,
        clientId
      }
      client.send(JSON.stringify(payLoad));
    }
    else {
      alert("must send a nickName")
      // nicknameElemnt.setCustomValidity("must send a nickName")
    }
  }
  const joinGame = () => {
    gameId = document.getElementById("gameIdInput").value;
    nickname = document.getElementById("nicknameInput").value;
    if (!!nickname && !!gameId) {
      let payLoad = {
        "method": "join",
        clientId,
        nickname,
        gameId
      }
      client.send(JSON.stringify(payLoad));
    }
    if (!gameId) {
      alert("must send gameID")
    }
    if (!nickname) {
      alert("must send nickName")
    }
  }

  const leaveGame = () => {
    let payLoad = {
      "method": "leaveGame",
      clientId
    }
    client.send(JSON.stringify(payLoad));
  }



  return (
    <div className="App" >
      {isGameStarted === false ? <Login leaveGame={leaveGame} createGame={createGame} joinGame={joinGame} client={client} clientId={clientId} inGame={inGame}/>
        : <Game
          client={client}
          clientId={clientId}
          playerNum={playerNum}
          cardsMap={cardsMapState}
          winnedCards={winnedCardsState}
          turn={turnState}
          isSuitBetting={isSuitBetting}
          isNumBetting={isNumBetting}
          suitBet={suitBetState}
          numBets={numBetState}
          sliceingSuit={sliceingSuitState}
          minBet={minBetState}
          // betWinner={betWinnerState}
          scoreMap={scoreMapState}/>}
    </div>
  );
}

export default App;





