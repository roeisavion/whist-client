import React, { useState } from 'react';
import './App.css';
import { Game } from '../Game/Game'
import { mock } from '../mocks/mock'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {  Routes, Route, useNavigate } from "react-router-dom";
import { WaitingRoomPage } from '../pages/WaitingRoomPage';
import { LoginPage } from '../pages/LoginPage';

const client = new W3CWebSocket(process.env.REACT_APP_SERVER_ADRESS);

let response, gameId, playerNum, nickname;
const App = () => {
  console.log('app component renderd')

  // const isMock = process.env.REACT_APP_IS_MOCK;
  const isMock = false;

  const [turnState, setTurn] = useState('P1')
  const [cardsMapState, setCardsMap] = useState(
    {'P1':[],
    'P2':[],    
    'P3':[],    
    'P4':[],    
    'center':[]})
  const [scoreMapState, setScoreMap] = useState({})
  const [suitBetState, setsuitBet] = useState(
  {'P1':undefined,
  'P2':undefined,
  'P3':undefined,
  'P4':undefined})
  const [numBetState, setNumBets] = useState(
  {'P1':undefined,
  'P2':undefined,
  'P3':undefined,
  'P4':undefined})
  const [winnedCardsState, setWinnedCards] = useState({})
  const [isSuitBetting, setIsSuitBetting] = useState(false);
  const [isNumBetting, setIsNumBetting] = useState(false);
  const [minBetState, setminBet] = useState([]);
  const [sliceingSuitState, setSliceingSuit] = useState("");
  const [inGame, setInGame] = useState(false);
  const [clientId, setClientId] = useState(false);
  const [game, setGame] = useState(null);
  const [isLeftGameModal, setIsLeftGameModal] = useState(false);
  // const [isScore, setIsScore] = useState(isMock ? mock.isScore : false);
  const [isScore, setIsScore] = useState(false);

  const showLeftGameModal = () => {
    setIsLeftGameModal(true);
    setTimeout(() => setIsLeftGameModal(false), 2000)
  }

  let navigate = useNavigate();

  client.onopen = () => {
    console.log('WebSocket Client Connected');
  };

  client.onmessage = (message) => {
    // @ts-ignore
    response = JSON.parse(message.data);
    if (response.method === "connect") {
      setClientId(response.clientId);
    }
    // created game
    if (response.method === "create") {
      gameId = response.gameId;
      playerNum = response.playerNum;
      setGame(response.game);
      setInGame(true);
      navigate(`/${gameId}/waitingRoom`);
    }

    if (response.method === "leftGame") {
      setGame(response.game);
      if (response.clientId === clientId) {
        setInGame(false);
      }
      showLeftGameModal()
    }

    if (response.method === "playerJoined") {
      gameId = response.game.id;
      setGame(response.game);
      if (response.clientId === clientId) {
        playerNum = response.playerNum;
        nickname = response.nickname;
        setInGame(true);
        navigate(`/${gameId}/waitingRoom`);
      }
    }
    if (response.method === "updateCards") {
      setCardsMap(response.cardsMap);
      setWinnedCards(response.winnedCards);
      setTurn(response.turn);
      navigate(`/${gameId}/game`);
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
        setminBet([response.minBet, response.betWinner]);
        setSliceingSuit(response.sliceingSuit);
      }
    }
    if (response.method === "score") {
      setScoreMap(response.scoreMap);
      setIsScore(true);
      alert("your score is: " + response.scoreMap[playerNum]);
    }
  };


  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<LoginPage
          client={client}
          clientId={clientId}
          inGame={inGame}
          game={game}
          gameId={gameId}
        />} />
        <Route path="/:gameId/waitingRoom" element={<WaitingRoomPage
          game={game}
          client={client}
          clientId={clientId}
          nickname={nickname}
          isLeftGameModal={isLeftGameModal}
          setIsLeftGameModal={setIsLeftGameModal} />} />
        <Route path="/:gameId/game" element={<Game
          game={isMock ? mock.game : game}
          client={client}
          clientId={clientId}
          playerNum={isMock ? mock.playerNum : playerNum}
          cardsMap={isMock ? mock.cardsMap : cardsMapState}
          winnedCards ={isMock ? mock.winnedCards : winnedCardsState }
          turn={turnState}
          isSuitBetting={isMock ? mock.isSuitBetting : isSuitBetting}
          isNumBetting={isMock ? mock.isNumBetting : isNumBetting}
          suitBet={isMock ? mock.suitBet : suitBetState }
          numBets={isMock ? mock.numBets : numBetState}
          sliceingSuit={sliceingSuitState}
          minBet={isMock ? mock.minBet : minBetState}
          scoreMap={scoreMapState}
          clients = {isMock ? mock.clients : (game ? game.clients : null)}
          setIsScore = {setIsScore}
          isScore = {isScore} />
        } />
      </Routes>
    </div>
  );
}

export default App;





