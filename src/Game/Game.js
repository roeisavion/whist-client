import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from "react";
import '../index.css';
import '../Hand/Hand.css';
import '../playerStats/playerStats.css';
import '../WinnerCards/WinnerCards.css';
import './Game.css';
import { Hand } from '../Hand/Hand'
import { playerStats } from '../playerStats/playerStats'
import { WinnerCards } from '../WinnerCards/WinnerCards'
import { Center } from '../Center/Center'
import { notYourTurnCardClick, removeCard, nextTurn, caculateRoundWinner, compareCards } from './gameFunctions'
import { getSuit } from '../helpers/helpersFunctions';
import { Bets } from '../Bets/Bets';

export const Game = (props) => {

  const [isP1Turn, setP1Turn] = useState(true);
  const [isP2Turn, setP2Turn] = useState(false);
  const [isP3Turn, setP3Turn] = useState(false);
  const [isP4Turn, setP4Turn] = useState(false);

  let setTurns = {
    P1: setP1Turn,
    P2: setP2Turn,
    P3: setP3Turn,
    P4: setP4Turn
  }

  const [P1Bet,setP1Bet] = useState('0');
  const [P2Bet,setP2Bet] = useState('0');
  const [P3Bet,setP3Bet] = useState('0');
  const [P4Bet,setP4Bet] = useState('0');

  let BetPointer = {
    P1: setP1Bet,
    P2: setP2Bet,
    P3: setP3Bet,
    P4: setP4Bet
  }

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

    [setP1Hand, setP2Hand, setP3Hand, setP4Hand].forEach((setHand) => {
      let tempArry = [];
      for (let i = 0; i < 13; i++) {
        let card = props.shuffledDeck.pop();
        tempArry.push(card)
      }
      tempArry.sort(compareCards)
      setHand(tempArry)
    })
  }, []);

  const handleCardClick = (clickedCard, originHand) => {
    let cardsInHand = handPointer[originHand][0]
    if (centerCards.length > 0) {
      let firstCard = centerCards[0];
      let firstSuit = getSuit(firstCard[0]);
      if (getSuit(clickedCard) !== firstSuit) {
        let shapeArray = cardsInHand.map(c => getSuit(c))
        if (shapeArray.includes(firstSuit)) {
          alert('not good shape');
          return
        }
      }
    }
    let newHand = removeCard(clickedCard, cardsInHand);
    handPointer[originHand][1](newHand);
    let copyCenter = centerCards;
    copyCenter.push([clickedCard, originHand])
    let newCenter = copyCenter
    setCenter(newCenter);
    let currentPlayer = originHand.slice(0, 2);
    setTurns[currentPlayer](false);
    setTurns[nextTurn[currentPlayer]](true);
  }

  useEffect(() => {
    if (centerCards.length === 4) {
      let bigCard = caculateRoundWinner(centerCards);

      let winPlayer = bigCard[1].slice(0, 2);
      let setWinPlayerCards = winnerCardsPointer[winPlayer][1];
      let WinPlayerCardsState = winnerCardsPointer[winPlayer][0];

      setWinPlayerCards(WinPlayerCardsState.concat(bigCard[0]));
      setCenter([]);
      Object.values(setTurns).forEach(st => st(false));
      setTurns[winPlayer](true);
    }
  });


  return (
    <div className="game">
      <Center arrayOfCards={centerCards.map(c => c[0])} className="center" />
      <Hand arrayOfCards={P1Hand} onClick={isP1Turn ? handleCardClick : notYourTurnCardClick} className="P1hand" cardClassName='card'/>
      <Hand arrayOfCards={P2Hand} onClick={isP2Turn ? handleCardClick : notYourTurnCardClick} className="P2hand" cardClassName='sideCard'/>
      <Hand arrayOfCards={P3Hand} onClick={isP3Turn ? handleCardClick : notYourTurnCardClick} className="P3hand" cardClassName='card'/>
      <Hand arrayOfCards={P4Hand} onClick={isP4Turn ? handleCardClick : notYourTurnCardClick} className="P4hand" cardClassName='sideCard'/>
      {/* <playerStats className="P1stats"/> */}
      {/* <div className="P1stats" ><Bets player='P1'/></div>
      <div className="P2stats" ><Bets player='P2'/></div>
      <div className="P3stats" ><Bets player='P3'/></div>
      <div className="P4stats" ><Bets player='P4'/></div> */}
      {
        P1WinnerCards.length !== 0 ? <WinnerCards arrayOfCards={P1WinnerCards} className='P1winnerCards' /> : null
      }
      {
        P2WinnerCards.length !== 0 ? <WinnerCards arrayOfCards={P2WinnerCards} className='P2winnerCards' /> : null
      }
      {
        P3WinnerCards.length !== 0 ? <WinnerCards arrayOfCards={P3WinnerCards} className='P3winnerCards' /> : null
      }
      {
        P4WinnerCards.length !== 0 ? <WinnerCards arrayOfCards={P4WinnerCards} className='P4winnerCards' /> : null
      }
    </div>
  )
}
