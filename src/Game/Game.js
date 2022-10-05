import React, { useEffect, useState } from 'react';
import '../index.css';
import '../Hand/Hand.css';
import '../WinnerCards/WinnerCards.css';
import './Game.css';
import { Hand } from '../Hand/Hand'
import { CompetitorsHand, CompetitorsHandRotated } from '../Hand/CompetitorsHand'
import { WinnerCards, WinnerCardsRotated } from '../WinnerCards/WinnerCards'
import { Center } from '../Center/Center'
import { playerShower, shapePointer } from './gameFunctions'
import { getSuit } from '../helpers/helpersFunctions';
import { SuitBets } from '../Bets/SuitBets';
import { NumBets } from '../Bets/NumBets';
import { keepSorted, handelSort } from '../Hand/handFunctions'
import { nicknameList } from '../WaitingRoom/waitingRoomFuctions'

let isSuitBetting, isNumBetting;
export const Game = (props) => {
  isSuitBetting = props.isSuitBetting;
  isNumBetting = props.isNumBetting;

  const [myHand, setMyHand] = useState([]);
  const [rightHand, setRightHand] = useState(13);
  const [TopHand, setTopHand] = useState(13);
  const [leftHand, setLeftHand] = useState(13);
  const [centerCards, setCenter] = useState([]);
  const [myWinnerCards, setMyWinnerCards] = useState(0);
  const [rightWinnerCards, setRightWinnerCards] = useState(0);
  const [topWinnerCards, setTopWinnerCards] = useState(0);
  const [leftWinnerCards, setLeftWinnerCards] = useState(0);
  const [IsSorted, setIsSorted] = useState(false);
  const [isMyTurn, setMyTurn] = useState(props.turn === props.playerNum ? true : false);
  const [isRightTurn, setRightTurn] = useState(false);
  const [isTopTurn, setTopTurn] = useState(false);
  const [isLeftTurn, setLeftTurn] = useState(false);
  const [myBet, setMyBet] = useState();
  const [rightBet, setRightBet] = useState();
  const [topBet, setTopBet] = useState();
  const [leftBet, setLeftBet] = useState();
  const [myNickname, setMyNickname] = useState();
  const [rightNickname, setRightNickname] = useState();
  const [topNickname, setTopNickname] = useState();
  const [leftNickname, setLeftNickname] = useState();

  const handPointer = {
    P1hand: [myHand, setMyHand],
    P2hand: [rightHand, setRightHand],
    P3hand: [TopHand, setTopHand],
    P4hand: [leftHand, setLeftHand]
  }

  const setHandPointer = {
    bottom: setMyHand,
    right: setRightHand,
    top: setTopHand,
    left: setLeftHand
  }

  const setNicknamePointer = {
    bottom: setMyNickname,
    right: setRightNickname,
    top: setTopNickname,
    left: setLeftNickname
  }

  const setTurnPointer = {
    bottom: setMyTurn,
    right: setRightTurn,
    top: setTopTurn,
    left: setLeftTurn
  }

  const realTurnPointer = {
    P1: false,
    P2: false,
    P3: false,
    P4: false
  }

  const setBetsPointer = {
    bottom: setMyBet,
    right: setRightBet,
    top: setTopBet,
    left: setLeftBet
  }

  const winnerCardsPointer = {
    bottom: setMyWinnerCards,
    right: setRightWinnerCards,
    top: setTopWinnerCards,
    left: setLeftWinnerCards,
  }


  const nicknamesMap = nicknameList(props.clients)


  useEffect(() => {
    Object.keys(realTurnPointer).forEach(p => {
      realTurnPointer[p] = false;
    });
    realTurnPointer[props.turn] = true;

    let i = 1;
    playerShower[props.playerNum].forEach((playerLocation) => {
      setHandPointer[playerLocation](props.cardsMap['P' + i]);
      setNicknamePointer[playerLocation](nicknamesMap['P' + i]); //doesnt needs to be inside useEffect
      if (props.winnedCards) {
        winnerCardsPointer[playerLocation](props.winnedCards['P' + i]);
      }
      realTurnPointer['P' + i] ? setTurnPointer[playerLocation](true) : setTurnPointer[playerLocation](false);
      setBetsPointer[playerLocation](isSuitBetting ? props.suitBet['P' + i] : props.numBets['P' + i]);

      i++;
      i === 5 ? i = 1 : i = i;
    })


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
          alert('incorrect suit');
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
      <div className='topContainer'>
        <div className="topBox">
          <CompetitorsHand numOfCards={TopHand} className="P3hand" cardClassName='card' />
          {topWinnerCards !== 0 ? <WinnerCards numOfCards={topWinnerCards} className='P3winnerCards' cardClassName='card' /> : null}
          <div>{topNickname}</div>
          {props.suitBet ? <div>currnt bet: {topBet}</div> : null}
          {isTopTurn ? <div>current turn</div> : null}
        </div>
      </div>

      <div className='centerContiener'>
        <div className="leftBox">
          <CompetitorsHandRotated numOfCards={leftHand} className="P4hand" cardClassName='sideCard' />
          {leftWinnerCards !== 0 ? <WinnerCardsRotated numOfCards={leftWinnerCards} className='P4winnerCards' cardClassName='sideCard' /> : null}
          <div>
            <div>{leftNickname}</div>
            {props.suitBet ? <div>currnt bet: {leftBet}</div> : null}
            {isLeftTurn ? <div>current turn</div> : null}
          </div>
        </div>
        <div className='centerBox'>
          {props.sliceingSuit !== null ? <div>Sliceing Suit: {shapePointer[props.sliceingSuit]} </div> : null}
          {centerCards.length !== 0 ? <Center arrayOfCards={centerCards.map(c => c[0])} className="center" /> : null}
        </div>
        <div className="rightBox">
          <CompetitorsHandRotated numOfCards={rightHand} className="P2hand" cardClassName='sideCard' />
          {rightWinnerCards !== 0 ? <WinnerCardsRotated numOfCards={rightWinnerCards} className='P2winnerCards' cardClassName='sideCard' /> : null}
          <div>
            <div>{rightNickname}</div>
            {props.suitBet ? <div>currnt bet: {rightBet}</div> : null}
            {isRightTurn ? <div>current turn</div> : null}
          </div>
        </div>
      </div>

      <div className='bottomContainer'>
        {isMyTurn ? <div>current turn</div> : null}
        <div>currnt bet: {myBet}</div>
        <div>{myNickname}</div>
        {myWinnerCards !== 0 ? <WinnerCards numOfCards={myWinnerCards} className='P1winnerCards' cardClassName='card' /> : null}
        {isSuitBetting ? <SuitBets client={props.client} clientId={props.clientId} isMyTurn={isMyTurn} suitBet={props.suitBet} /> : null}
        {isNumBetting ? < NumBets client={props.client} clientId={props.clientId} isMyTurn={isMyTurn} numBets={props.numBets} minBet={props.minBet} playerNum={props.playerNum} /> : null}
        <Hand arrayOfCards={IsSorted ? keepSorted(myHand) : myHand} onClick={handleCardClick} className="P1hand" cardClassName='myCard' shouldDisable={!isMyTurn || isSuitBetting || isNumBetting} />
        <button className='smallButton' onClick={() => handelSort(setMyHand, myHand, setIsSorted)} disabled={IsSorted} >sort</button>
      </div>
    </div>
  )
}
