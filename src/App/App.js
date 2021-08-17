import './App.css';
import {Game} from '../Game/Game'
import {Login} from '../login/login'
import { createDeck, shuffleDeck } from '../deck.jsx'

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:9090');
//let shuffledDeck = shuffleDeck(createDeck());

function App() {
  return (
    <div className="App">
      {/* <Game shuffledDeck={shuffledDeck}/> */}
      <Login client={client}/>
    </div>
  );
}

export default App;
