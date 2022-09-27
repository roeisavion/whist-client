import React, { useState } from 'react';
import './App.css';
import { Game } from '../Game/Game'
import { Login } from '../login/login'
import { GameCreatedModal } from '../Modals/GameCreatedModal'
import { mock } from '../mocks/mock'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
// import { WaitingRoom } from '../login/WatingRoom'
import { WaitingRoomPage } from '../pages/WaitingRoomPage';

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

  const isMock = true;

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
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSuitBetting, setIsSuitBetting] = useState(false);
  const [isNumBetting, setIsNumBetting] = useState(false);
  const [minBetState, setminBet] = useState([]);
  const [sliceingSuitState, setSliceingSuit] = useState("");
  const [inGame, setInGame] = useState(false);
  const [clientId, setClientId] = useState(false);
  const [game, setGame] = useState(null);
  const [isGameCreatedModal, setisGameCreatedModal] = useState(false);
  const [isLeftGameModal, setIsLeftGameModal] = useState(false);

  const showLeftGameModal = () => {
    setIsLeftGameModal(true);
    setTimeout(() => setIsLeftGameModal(false), 2000)
  }

  let navigate = useNavigate();

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
      setGame(response.game);
      setInGame(true);
      navigate(`/${gameId}/waitingRoom`);
      // setisGameCreatedModal(true)
    }

    if (response.method === "leftGame") {
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
      setIsGameStarted(true)
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
      setScoreMap(response.scoreMap)
      alert("your score is: " + response.scoreMap[playerNum])
    }
  };


  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<Login
          client={client}
          clientId={clientId}
          inGame={inGame}
          game={game}
          gameId={gameId}
          isGameCreatedModal={isGameCreatedModal}
          setisGameCreatedModal={setisGameCreatedModal}
        />} />
        <Route path="/:gameId/waitingRoom" element={<WaitingRoomPage
          game={game}
          client={client}
          clientId={clientId}
          nickname={nickname}
          isLeftGameModal={isLeftGameModal}
          setIsLeftGameModal={setIsLeftGameModal} />} />
        <Route path="/:gameId/game" element={<Game
          client={client}
          clientId={clientId}
          // playerNum={playerNum}
          playerNum={isMock ? mock.playerNum : playerNum}
          // cardsMap={cardsMapState}
          cardsMap={isMock ? mock.cardsMap : cardsMapState}
          // winnedCards={winnedCardsState}
          winnedCards ={isMock ? mock.winnedCards : winnedCardsState }
          turn={turnState}
          isSuitBetting={isSuitBetting}
          isNumBetting={isNumBetting}
          // suitBet={suitBetState}
          suitBet={isMock ? mock.suitBet : suitBetState }
          // numBets={numBetState}
          numBets={isMock ? mock.numBets : numBetState}
          sliceingSuit={sliceingSuitState}
          minBet={minBetState}
          scoreMap={scoreMapState} />
        } />
      </Routes>
    </div>
  );
}

export default App;





