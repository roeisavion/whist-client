import React, { useEffect, useState } from 'react';
import './App.css';
import { Game } from '../Game/Game'
import { Login } from '../login/login'
import { createGame, joinGame } from '../login/loginFunctions.js'
import { mock } from '../mocks/mock'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:9091');
// let client;
// try {
//   client = new W3CWebSocket('wss://powerful-plains-99715.herokuapp.com');
// } catch (error) {
//   setTimeout(() => {
//     client = new W3CWebSocket('wss://powerful-plains-99715.herokuapp.com');
//   }, 1500);
// }
let response, gameId, playerNum, nickname;
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
  const [inGame, setInGame] = useState(false);
  const [clientId, setClientId] = useState(false);
  const [game, setGame] = useState(null);

  client.onopen = () => {
    console.log('WebSocket Client Connected');
  };

  client.onmessage = (message) => {
    response = JSON.parse(message.data);
    if (response.method === "connect") {
      setClientId(response.clientId);
      console.log("Client id Set successfully " + clientId)
    }
    // created game
    if (response.method === "create") {
      gameId = response.gameId;
      playerNum = response.playerNum;
      setGame(response.games[gameId]);
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
        setGame(response.game);
        setInGame(true);
      }
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
      }
    }
    if (response.method === "score") {
      setScoreMap(response.scoreMap)
      alert("your score is: " + response.scoreMap[playerNum])
    }
  };


  return (
    <div className="App" >
      {/* {isGameStarted === false ? <Login client={client} clientId={clientId} inGame={inGame} game={game}/> */}
        {/* : <Game */}
        <Game
          client={client}
          clientId={clientId}
          // playerNum={playerNum}
          playerNum={mock.playerNum}
          // cardsMap={cardsMapState}
          cardsMap={mock.cardsMap}
          // winnedCards={winnedCardsState}
          winnedCards={mock.winnedCards}
          turn={mock.turn}
          isSuitBetting={mock.isSuitBetting}
          isNumBetting={mock.isNumBetting}
          suitBet={mock.suitBet}
          numBets={mock.numBet}
          sliceingSuit={mock.sliceingSuit}
          minBet={mock.minBet}
          scoreMap={mock.scoreMap}/>
    </div>
  );
}

export default App;





