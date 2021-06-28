import React, { useEffect, useState } from 'react';
import '../index.css';
import '../Hand/Hand.css';
import '../WinnerCards/WinnerCards.css';
import './Game.css';
import { createDeck, shuffleDeck, cardsNumberOrder } from '../deck.jsx'
import { Hand } from '../Hand/Hand'
import { WinnerCards } from '../WinnerCards/WinnerCards'
import { Center } from '../Center/Center'
import { Card } from '../Card/Card'

//let shuffledDeck = shuffleDeck(createDeck());
// const pointer = {
//   P1hand: [P1Hand, setP1Hand], 
//   P2hand: [P2Hand, setP2Hand], 
//   P3hand: [P3Hand, setP3Hand], 
//   P4hand: [P4Hand, setP4Hand], 
// }



export const Game = (props) => {
  const [P1Hand, setP1Hand] = useState([]);
  const [P2Hand, setP2Hand] = useState([]);
  const [P3Hand, setP3Hand] = useState([]);
  const [P4Hand, setP4Hand] = useState([]);
  const [centerCards, setCenter] = useState([]);
  const [P1WinnerCards, setP1WinnerCards] = useState([]);
  const [P2WinnerCards, setP2WinnerCards] = useState([]);
  const [P3WinnerCards, setP3WinnerCards] = useState([]);
  const [P4WinnerCards, setP4WinnerCards] = useState([]);

  const handPointer = {
    P1hand: [P1Hand, setP1Hand], 
    P2hand: [P2Hand, setP2Hand], 
    P3hand: [P3Hand, setP3Hand], 
    P4hand: [P4Hand, setP4Hand]
  }

  const winnerCardsPointer = {
    P1: [P1WinnerCards, setP1WinnerCards], 
    P2: [P2WinnerCards, setP2WinnerCards], 
    P3: [P3WinnerCards, setP3WinnerCards], 
    P4: [P4WinnerCards, setP4WinnerCards], 
  }
  


  useEffect(() => {
    
    [setP1Hand,setP2Hand,setP3Hand,setP4Hand].forEach((setHand) => {
      let tempArry = [];
      for (let i = 0; i < 13; i++) {
        let card = props.shuffledDeck.pop();
        tempArry.push(card)
      }
      setHand(tempArry)
    })
  }, []);

  const handleCardClick = (clickedCard, originHand) => {
    
    let newHand = removeCard(clickedCard, handPointer[originHand][0]);
    handPointer[originHand][1](newHand);
    
    let p = originHand.slice(0,2);

    let newCenter = centerCards.concat(clickedCard)
    setCenter(newCenter);
  }

  const removeCard = (clickedCard, currentHand) => {
    return currentHand.filter(currentCard => currentCard !== clickedCard)
  }

  const caculateRoundWinner = (centerCards) => {
    let firstCard = centerCards[0];
    let firstSuit = firstCard[1];
    let bigCard = firstCard;
    for (let i = 1; i < 4; i++) {
      let card = centerCards[i];
      let cardSuit = card[1];
      if (card[1] === firstSuit) {
        if (cardsNumberOrder.indexOf(card[0]) > cardsNumberOrder.indexOf(bigCard[0])) {
          bigCard = card;
        }
      }
    }
    return bigCard;
  }

  useEffect(() => {
    if (centerCards.length === 4) {
      let bigCard = caculateRoundWinner(centerCards);

      setP1WinnerCards(P1WinnerCards.concat(bigCard));
      setCenter([]);
    }
  }, [centerCards]);


  return (
    <div className="game">
      <Center arrayOfCards={centerCards} className="center" />
      <Hand arrayOfCards={P1Hand} onClick={handleCardClick} className="P1hand" />
      <Hand arrayOfCards={P2Hand} onClick={handleCardClick} className="P2hand" />
      <Hand arrayOfCards={P3Hand} onClick={handleCardClick} className="P3hand" />
      <Hand arrayOfCards={P4Hand} onClick={handleCardClick} className="P4hand" />
      {
        P1WinnerCards.length !== 0 ? <WinnerCards arrayOfCards={P1WinnerCards} /> : null
      }
    </div>
  )
}



  //<WinnerCards arrayOfCards={winnerCards} />
  //<div className="winnerCards"><Card cardName={bigCard} key={bigCard}/></div>
        //setWinnerCards(winnerCards.concat(bigCard))