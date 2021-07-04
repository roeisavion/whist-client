import React, { useEffect, useState } from 'react';
import '../index.css';
import '../Hand/Hand.css';
import '../WinnerCards/WinnerCards.css';
import './Game.css';
import {cardsNumberOrder } from '../deck.jsx'
import { Hand } from '../Hand/Hand'
import { WinnerCards } from '../WinnerCards/WinnerCards'
import { Center } from '../Center/Center'




let turns = {
  P1 : true,
  P2 : false,
  P3 : false,
  P4 : false
}

  const nextTurn = {
    P1 : 'P2',
    P2 : 'P3',
    P3 : 'P4',
    P4 : 'P1'
  }
  
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
  
const getSuit = ((cardString) => cardString.charAt(cardString.length-1));
const getNumber = ((cardString) => cardString.slice(0,cardString.length-1));

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
    let copyCenter = centerCards;
    copyCenter.push([clickedCard,originHand])
    let newCenter = copyCenter
    setCenter(newCenter);
    let currentPlayer = originHand.slice(0,2);
    turns[currentPlayer] = false;
    turns[nextTurn[currentPlayer]] = true;
  }

  const notYourTurnCardClick = (clickedCard, originHand) => {
    alert('not your turn')
  }

  const removeCard = (clickedCard, currentHand) => {
    return currentHand.filter(currentCard => currentCard !== clickedCard)
  }

  const caculateRoundWinner = (centerCards) => {
    let firstCard = centerCards[0];
    let firstSuit = getSuit(firstCard[0]);
    let bigCard = firstCard;
    for (let i = 1; i < 4; i++) {
      let card = centerCards[i];
      let cardSuit = getSuit(card[0])
      if (cardSuit === firstSuit) {
        if (cardsNumberOrder.indexOf(getNumber(card[0])) > cardsNumberOrder.indexOf(getNumber(bigCard[0]))) {
          bigCard = card;
        }
      }
    }
    return bigCard;
  }

  useEffect(() => {
    if (centerCards.length === 4) {
      let bigCard = caculateRoundWinner(centerCards);

      
      let winPlayer = bigCard[1].slice(0,2);
      let setWinPlayerCards = winnerCardsPointer[winPlayer][1];
      let WinPlayerCardsState = winnerCardsPointer[winPlayer][0];
      
      setWinPlayerCards(WinPlayerCardsState.concat(bigCard[0]));
      setCenter([]);
      
      turns[winPlayer] = true;

    }
  });

//, [centerCards]

  return (
    <div className="game">
      <Center arrayOfCards= {centerCards.map(c => c[0])} className="center" />
      <Hand arrayOfCards={P1Hand} onClick={turns["P1"] ? handleCardClick : notYourTurnCardClick} className="P1hand" />
      <Hand arrayOfCards={P2Hand} onClick={turns["P2"] ? handleCardClick : notYourTurnCardClick} className="P2hand" />
      <Hand arrayOfCards={P3Hand} onClick={turns["P3"] ? handleCardClick : notYourTurnCardClick} className="P3hand" />
      <Hand arrayOfCards={P4Hand} onClick={turns["P4"] ? handleCardClick : notYourTurnCardClick} className="P4hand" />
      {
        P1WinnerCards.length !== 0 ? <WinnerCards arrayOfCards={P1WinnerCards} className='P1winnerCards' /> : null
      }
      {
        P2WinnerCards.length !== 0 ? <WinnerCards arrayOfCards={P2WinnerCards} className='P2winnerCards'/> : null
      }
      {
        P3WinnerCards.length !== 0 ? <WinnerCards arrayOfCards={P3WinnerCards} className='P3winnerCards'/> : null
      }
      {
        P4WinnerCards.length !== 0 ? <WinnerCards arrayOfCards={P4WinnerCards} className='P4winnerCards' /> : null
      }
    </div>
  )
}
