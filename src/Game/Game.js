import React, { useEffect, useState } from 'react';
import '../index.css';
import '../Hand/Hand.css';
import '../WinnerCards/WinnerCards.css';
import './Game.css';
import { createDeck, shuffleDeck, cardsNumberOrder } from '../deck.jsx'
import { Hand, P2Hand } from '../Hand/Hand'
import { WinnerCards } from '../WinnerCards/WinnerCards'
import { Center } from '../Center/Center'
import { Card } from '../Card/Card'

//let shuffledDeck = shuffleDeck(createDeck());


export const Game = (props) => {
  const [firstHand, setHand] = useState([]);
  const [P2hand, setP2Hand] = useState([]);
  const [centerCards, setCenter] = useState([]);
  const [winnerCards, setWinnerCards] = useState([]);


  useEffect(() => {
    let tempArry = [];
    let tempArry2 = [];

    for (let i = 0; i < 13; i++) {
      let card = props.shuffledDeck.pop();
      tempArry.push(card)
    }

    for (let i = 0; i < 13; i++) {
      let card = props.shuffledDeck.pop();
      tempArry2.push(card)
    }

    setHand(tempArry);
    setP2Hand(tempArry2)

  }, []);

  const handleCardClick = (clickedCard, originHand) => {
    if (originHand === 'hand') {
      let newHand = removeCard(clickedCard, firstHand);
      setHand(newHand);
    }
    if (originHand === 'P2hand') {
      let newHand = removeCard(clickedCard, P2hand);
      setP2Hand(newHand);
    }
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
      setWinnerCards(winnerCards.concat(bigCard));
      setCenter([]);
    }
  }, [centerCards]);


  return (
    <div className="game">
      <Center arrayOfCards={centerCards} className="center" />
      <Hand arrayOfCards={firstHand} onClick={handleCardClick} className="hand" />
      <Hand arrayOfCards={P2hand} onClick={handleCardClick} className="P2hand" />
      {
        winnerCards.length !== 0 ? <WinnerCards arrayOfCards={winnerCards} /> : null
      }
    </div>
  )
}



  //<WinnerCards arrayOfCards={winnerCards} />
  //<div className="winnerCards"><Card cardName={bigCard} key={bigCard}/></div>
        //setWinnerCards(winnerCards.concat(bigCard))