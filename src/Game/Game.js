import React, { useEffect, useState } from 'react';
import '../index.css';
import '../Hand/Hand.css';
import '../WinnerCards/WinnerCards.css';
import './Game.css';
import { Hand } from '../Hand/Hand'
import { CompetitorsHand } from '../Hand/CompetitorsHand'
import { WinnerCards } from '../WinnerCards/WinnerCards'
import { Center } from '../Center/Center'
import { playerShower } from './gameFunctions'
import { getSuit } from '../helpers/helpersFunctions';
import { SuitBets } from '../Bets/SuitBets';
import { NumBets } from '../Bets/NumBets';
import { keepSorted, handelSort } from '../Hand/handFunctions'

let isSuitBetting, isNumBetting, rightBet, topBet, leftBet;
export const Game = (props) => {
  isSuitBetting = props.isSuitBetting;
  isNumBetting = props.isNumBetting;

  const [myHand, setMyHand] = useState([]);
  const [rightHand, setRightHand] = useState(13);
  const [TopHand, setTopHand] = useState(13);
  const [leftHand, setLeftHand] = useState(13);
  const [centerCards, setCenter] = useState([]);
  const [myWinnerCards, setMyWinnerCards] = useState([]);
  const [rightWinnerCards, setRightWinnerCards] = useState([]);
  const [topWinnerCards, setTopWinnerCards] = useState([]);
  const [leftWinnerCards, setLeftWinnerCards] = useState([]);
  const [IsSorted, setIsSorted] = useState(false);
  const [isP1Turn, setP1Turn] = useState(false);
  const [isMyTurn, setMyTurn] = useState(props.turn === props.playerNum ? true : false);
  const [isRightTurn, setRightTurn] = useState(false);
  const [isTopTurn, setTopTurn] = useState(false);
  const [isLeftTurn, setLeftTurn] = useState(false);

  let myBet = "haven't betted yet"

  if (props.isSuitBetting) {
    if (props.suitBet[props.playerNum]) {
      myBet = props.suitBet[props.playerNum];
    } // need to fix after finish suit betting
  } if (props.numBets) {
    myBet = props.numBets[props.playerNum];
  }

  const handPointer = {
    P1hand: [myHand, setMyHand],
    P2hand: [rightHand, setRightHand],
    P3hand: [TopHand, setTopHand],
    P4hand: [leftHand, setLeftHand]
  }

  const setHandPointer = {
    P1: setMyHand,
    P2: setRightHand,
    P3: setTopHand,
    P4: setLeftHand
  }

  const setTurnPointer = {
    // P1: setP1Turn,
    P1: setMyTurn,
    P2: setRightTurn,
    P3: setTopTurn,
    P4: setLeftTurn
  }

  const realTurnPointer = {
    P1: false,
    P2: false,
    P3: false,
    P4: false
  }

  const betsPointer = {
    P1: myBet,
    P2: rightBet,
    P3: topBet,
    P4: leftBet
  }

  const winnerCardsPointer = {
    P1: setMyWinnerCards,
    P2: setRightWinnerCards,
    P3: setTopWinnerCards,
    P4: setLeftWinnerCards,
  }

  useEffect(() => {
    Object.keys(realTurnPointer).forEach(p => {
      realTurnPointer[p] = false;
    });
    realTurnPointer[props.turn] = true;

    let i = 1;
    playerShower[props.playerNum].forEach((p) => {
      setHandPointer['P' + i](props.cardsMap[p]);
      if (props.winnedCards) {
        winnerCardsPointer['P' + i](props.winnedCards[p]);
      }
      realTurnPointer[p] ? setTurnPointer['P' + i](true) : setTurnPointer['P' + i](false);
      betsPointer[p] = isSuitBetting ? props.suitBet['P' + i] : props.numBets['P' + i];

      console.log(props.cardsMap['P' + i])
      i++;
      i === 5 ? i = 1 : i = i;
    })

    // if (props.turn === props.playerNum) {
    //   setMyTurn(true)
    // } else {
    //   setMyTurn(false)
    // }

    Object.keys(setTurnPointer).forEach(sp => {
      setTurnPointer[sp](false);
    })
    setTurnPointer[props.turn](true);

    setCenter(props.cardsMap['center']);
  }, [props]);


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

    let payLoad = {
      "method": "updateCards",
      "playerPlayed": props.playerNum,
      "cardPlayed": clickedCard,
      "clientId": props.clientId
    }
    props.client.send(JSON.stringify(payLoad));

  }


  return (
    <div className="game">

      {centerCards !== null ? <Center arrayOfCards={centerCards.map(c => c[0])} className="center" /> : null}

      <div className="bottomBox">
        {isMyTurn ? <div>current turn</div> : null}
        {props.suitBet ? <div>currnt bet:{myBet}</div> : null}
        {myWinnerCards.length !== 0 ? <WinnerCards arrayOfCards={myWinnerCards} className='P1winnerCards' cardClassName='card' /> : null}
        <button onClick={() => handelSort(setMyHand, myHand, setIsSorted)} disabled={IsSorted} >sort</button>
        {isSuitBetting ? <SuitBets client={props.client} clientId={props.clientId} isMyTurn={isMyTurn} suitBet={props.suitBet} /> : null}
        {isNumBetting ? < NumBets client={props.client} clientId={props.clientId} isMyTurn={isMyTurn} numBets={props.numBets} minBet={props.minBet} playerNum={props.playerNum} /> : null}
        <Hand arrayOfCards={IsSorted ? keepSorted(myHand) : myHand} onClick={handleCardClick} className="P1hand" cardClassName='myCard' shouldDisable={!isMyTurn || isSuitBetting || isNumBetting} />
      </div>

      <div className="topBox">
        <CompetitorsHand numOfCards={TopHand} className="P3hand" cardClassName='card' />
        {topWinnerCards.length !== 0 ? <WinnerCards arrayOfCards={topWinnerCards} className='P3winnerCards' cardClassName='card' /> : null}
        {props.suitBet ? <div>currnt bet:{topBet}</div> : null}
        {isTopTurn ? <div>current turn</div> : null}
      </div>

      {/* <div className="middleBox"> */}
        <div className="rightBox">
          <CompetitorsHand numOfCards={rightHand} className="P2hand" cardClassName='card' />
          {rightWinnerCards.length !== 0 ? <WinnerCards arrayOfCards={rightWinnerCards} className='P2winnerCards' cardClassName='card' /> : null}
          <div>
            {props.suitBet ? <div>currnt bet:{rightBet}</div> : null}
            {isRightTurn ? <div>current turn</div> : null}
          </div>
        </div>

        <div className="leftBox">
          <CompetitorsHand numOfCards={leftHand} className="P4hand" cardClassName='card' />
          {leftWinnerCards.length !== 0 ? <WinnerCards arrayOfCards={leftWinnerCards} className='P4winnerCards' cardClassName='card' /> : null}
          <div>
            {props.suitBet ? <div>currnt bet:{leftBet}</div> : null}
            {isLeftTurn ? <div>current turn</div> : null}
          </div>
        </div>
        
      {/* </div> */}

    </div>
  )
}
