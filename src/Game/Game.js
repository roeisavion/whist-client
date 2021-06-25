import React, { useEffect, useState } from 'react';
import '../index.css';
import '../Hand/Hand.css';
import './Game.css';
import { createDeck, shuffleDeck, number } from '../deck.jsx'
import {Hand} from '../Hand/Hand'
import {Center} from '../Center/Center'

//let shuffledDeck = shuffleDeck(createDeck());


export const Game = (props) => {
    const [firstHand, setHand] = useState([]);
    const [centerCards, setCenter] = useState([]);
  
    useEffect(() => {
      let tempArry = [];
  
      for (let i = 0; i < 13; i++) {
        let card = props.shuffledDeck.pop();
        tempArry.push(card)
      }
  
      setHand(tempArry);
    }, []);
  
    const handleCardClick = (clickedCard) => {
      let newHand = removeCard(clickedCard, firstHand);
      setHand(newHand);
      // let newCenterCards = [...centerCards];
      // newCenterCards.push(clickedCard);
      // setCenter(newCenterCards);
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
        if (card[1] === firstSuit){
          if (number.indexOf(card[0]) > number.indexOf(bigCard[0])){
            bigCard=card;
          }
        }
      }
      return bigCard;
    }

    return <div className="game">
      <Center arrayOfCards={centerCards} className="center"/>
      <Hand arrayOfCards={firstHand} onClick={handleCardClick} className="hand" />
       </div>
  }