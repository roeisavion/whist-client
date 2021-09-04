import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from "react";
import '../index.css';
import '../Hand/Hand.css';
import '../playerStats/playerStats.css';
import '../WinnerCards/WinnerCards.css';
import './Game.css';
import { Hand } from '../Hand/Hand'
import { CompetitorsHand } from '../Hand/CompetitorsHand'
import { playerStats } from '../playerStats/playerStats'
import { WinnerCards } from '../WinnerCards/WinnerCards'
import { Center } from '../Center/Center'
import { notYourTurnCardClick, removeCard, nextTurn, caculateRoundWinner, compareCards, playerShower } from './gameFunctions'
import { getSuit } from '../helpers/helpersFunctions';
import { Bets } from '../Bets/Bets';

export const Game = (props) => {

  const [isP1Turn, setP1Turn] = useState(props.turn === props.playerNum ? true : false);
  // const [isP2Turn, setP2Turn] = useState(false);
  // const [isP3Turn, setP3Turn] = useState(false);
  // const [isP4Turn, setP4Turn] = useState(false);

// props.turn === props.playerNum ? setP1Turn(true) : setP1Turn(false)


  // let setTurns = {
  //   P1: setP1Turn,
  //   P2: setP2Turn,
  //   P3: setP3Turn,
  //   P4: setP4Turn
  // }

  // const [P1Bet,setP1Bet] = useState('0');
  // const [P2Bet,setP2Bet] = useState('0');
  // const [P3Bet,setP3Bet] = useState('0');
  // const [P4Bet,setP4Bet] = useState('0');

  // let BetPointer = {
  //   P1: setP1Bet,
  //   P2: setP2Bet,
  //   P3: setP3Bet,
  //   P4: setP4Bet
  // }

  const [P1Hand, setP1Hand] = useState([]);
  const [P2Hand, setP2Hand] = useState(13);
  const [P3Hand, setP3Hand] = useState(13);
  const [P4Hand, setP4Hand] = useState(13);
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

  const setHandPointer = {
    P1: setP1Hand,
    P2: setP2Hand,
    P3: setP3Hand,
    P4: setP4Hand
  }

  const winnerCardsPointer = {
    P1: setP1WinnerCards,
    P2: setP2WinnerCards,
    P3: setP3WinnerCards,
    P4: setP4WinnerCards,
  }

  // const winnerCardsPointer = {
  //   P1: [P1WinnerCards, setP1WinnerCards],
  //   P2: [P2WinnerCards, setP2WinnerCards],
  //   P3: [P3WinnerCards, setP3WinnerCards],
  //   P4: [P4WinnerCards, setP4WinnerCards],
  // }

  useEffect(() => {

    // [setP1Hand, setP2Hand, setP3Hand, setP4Hand].forEach((setHand) => {
    //   // tempArry.sort(compareCards)
    //   setHand(tempArry)
    // })
    let i = 1;
    playerShower[props.playerNum].forEach((p) => {
      setHandPointer['P'+i](props.cardsMap[p]);
      if(props.winnedCards){
        winnerCardsPointer['P'+i](props.winnedCards[p]);
      }
      // props.winnedCards['P'+i] ? winnerCardsPointer['P'+i](props.winnedCards['P'+i]) : null ;
      console.log(props.cardsMap['P'+i])
      i++;
      i===5 ? i=1 : i=i;

      if(props.turn === props.playerNum){
        setP1Turn(true)
      }else{
        setP1Turn(false)
      }
      
    })


    //setP1Hand(props.playerCards)
    //setP1Hand(props.cardsMap[props.playerNum])
    // setP2Hand(props.cardsMap['P2'])
    // setP3Hand(props.cardsMap['P3'])
    // setP4Hand(props.cardsMap['P4'])
    setCenter(props.cardsMap['center']);
    // if(props.winnedCards){
    //   setP1WinnerCards(props.winnedCards['P1'])  
    //   setP2WinnerCards(props.winnedCards['P2'])
    //   setP3WinnerCards(props.winnedCards['P3'])
    //   setP4WinnerCards(props.winnedCards['P4'])
    // }

  }, [props]);

  // const handleCardClick = (clickedCard, originHand) => {
  //   let cardsInHand = handPointer[originHand][0]
  //   if (centerCards.length > 0) {
  //     let firstCard = centerCards[0];
  //     let firstSuit = getSuit(firstCard[0]);
  //     if (getSuit(clickedCard) !== firstSuit) {
  //       let shapeArray = cardsInHand.map(c => getSuit(c))
  //       if (shapeArray.includes(firstSuit)) {
  //         alert('not good shape');
  //         return
  //       }
  //     }
  //   }
     
  //   let newHand = removeCard(clickedCard, cardsInHand);
  //   handPointer[originHand][1](newHand);
  //   let copyCenter = centerCards;
  //   copyCenter.push([clickedCard, originHand])
  //   let newCenter = copyCenter
  //   setCenter(newCenter);
  //   let currentPlayer = originHand.slice(0, 2);
  //   setTurns[currentPlayer](false);
  //   setTurns[nextTurn[currentPlayer]](true);
  // }

  const newHandleCardClick = (clickedCard, originHand) => {
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
    
    let payLoad = {
      "method" : "updateCards",
      "playerPlayed" : props.playerNum,
      "cardPlayed" : clickedCard
    }
    props.client.send(JSON.stringify(payLoad));
    
    
    // let newHand = removeCard(clickedCard, cardsInHand);
    // handPointer[originHand][1](newHand);

    // let copyCenter = centerCards;
    // copyCenter.push([clickedCard, originHand])
    // let newCenter = copyCenter
    // setCenter(newCenter);
    // let currentPlayer = originHand.slice(0, 2);
    // setTurns[currentPlayer](false);
    // setTurns[nextTurn[currentPlayer]](true);
  }

  

  

  // useEffect(() => {
  //   if (centerCards.length === 4) {
  //     let bigCard = caculateRoundWinner(centerCards);

  //     let winPlayer = bigCard[1].slice(0, 2);
  //     let setWinPlayerCards = winnerCardsPointer[winPlayer][1];
  //     let WinPlayerCardsState = winnerCardsPointer[winPlayer][0];

  //     setWinPlayerCards(WinPlayerCardsState.concat(bigCard[0]));
  //     setCenter([]);
  //     Object.values(setTurns).forEach(st => st(false));
  //     setTurns[winPlayer](true);

  //   }
  // });


  return (
    <div className="game">
      {centerCards !== null ? <Center arrayOfCards={centerCards.map(c => c[0])} className="center" /> : null }

      <Hand arrayOfCards={P1Hand} onClick={isP1Turn ? newHandleCardClick : notYourTurnCardClick} className="P1hand" cardClassName='card'/>
      {P1WinnerCards.length !== 0 ? <WinnerCards arrayOfCards={P1WinnerCards} className='P1winnerCards' cardClassName='card'/> : null}
      
      <CompetitorsHand numOfCards={P2Hand} className="P2hand" cardClassName='sideCard'/>
      {P2WinnerCards.length !== 0 ? <WinnerCards arrayOfCards={P2WinnerCards} className='P2winnerCards' cardClassName='sideCard'/> : null}
      
      <CompetitorsHand numOfCards={P3Hand} className="P3hand" cardClassName='card'/>
      {P3WinnerCards.length !== 0 ? <WinnerCards arrayOfCards={P3WinnerCards} className='P3winnerCards' cardClassName='card'/> : null}

      <CompetitorsHand numOfCards={P4Hand} className="P4hand" cardClassName='sideCard'/>
      {P4WinnerCards.length !== 0 ? <WinnerCards arrayOfCards={P4WinnerCards} className='P4winnerCards' cardClassName='sideCard'/> : null}

      
      {/* <div className="P1stats" ><Bets player='P1'/></div>
      <div className="P2stats" ><Bets player='P2'/></div>
      <div className="P3stats" ><Bets player='P3'/></div>
      <div className="P4stats" ><Bets player='P4'/></div> */}
    </div>
  )
}
