import './App.css';
import {Game} from '../Game/Game'
import { createDeck, shuffleDeck } from '../deck.jsx'


let shuffledDeck = shuffleDeck(createDeck());

function App() {
  return (
    <div className="App">
      <Game shuffledDeck={shuffledDeck}/>
    </div>
  );
}

export default App;
