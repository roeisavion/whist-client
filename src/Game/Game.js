import React, { useEffect, useState } from 'react';
import _ from 'lodash';
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
import { widthStyle, heightStyle, sizeCalc } from './gameFunctions'

let isSuitBetting, isNumBetting;
export const Game = (props) => {
  console.log('game component renderd')
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
  const [isDisabled, setIsDisabled] = useState(false);

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


  const nicknamesMap = nicknameList(props.clients);
  useEffect(() => {
    let i = 1;
    playerShower[props.playerNum].forEach((playerLocation) => {
      setNicknamePointer[playerLocation](nicknamesMap['P' + i]);
      i++;
      if (i === 5) i = 1;
    })
  })


  useEffect(() => {
    console.log('useEffect ran')
    setIsDisabled(false);
    Object.keys(realTurnPointer).forEach(p => {
      realTurnPointer[p] = false;
    });
    if (props.turn) { realTurnPointer[props.turn] = true }

    let i = 1;
    playerShower[props.playerNum].forEach((playerLocation) => {
      setHandPointer[playerLocation](props.cardsMap['P' + i]);
      realTurnPointer['P' + i] ? setTurnPointer[playerLocation](true) : setTurnPointer[playerLocation](false);
      setBetsPointer[playerLocation](isSuitBetting ? props.suitBet['P' + i] : props.numBets['P' + i]);

      i++;
      if (i === 5) i = 1;
    })

    let timeoutId;
    if (_.isEmpty(props.cardsMap['center'])) {

      timeoutId = setTimeout(() => {
        setCenter(props.cardsMap['center'])
        if (props.winnedCards) {
          let i = 1;
          playerShower[props.playerNum].forEach((playerLocation) => {
            winnerCardsPointer[playerLocation](props.winnedCards['P' + i]);
            i++;
            if (i === 5) i = 1;
          })
        }
      }, 1500)
    }
    else {
      setCenter(props.cardsMap['center']);
    }
    return () => clearTimeout(timeoutId);
    // }, [props.cardsMap, props.turn, props.bet]);
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
    setIsDisabled(true);
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
        <div className={isTopTurn ? 'topBox isTurn' : 'topBox'}>
          <CompetitorsHand numOfCards={TopHand} className="P3hand" cardClassName='card' style={widthStyle(sizeCalc(TopHand))} />
          <div className='topBetAndWins'>
            {topWinnerCards !== 0 ? <WinnerCards 
            numOfCards={topWinnerCards} 
            className='P3winnerCards' 
            cardClassName='winnedCard' 
            style={widthStyle(sizeCalc(topWinnerCards))} /> : null}
            <div>
              <div className='currntBet'>{topNickname} </div>
              <div className='currntBet'> bet: {topBet}</div>
            </div>
          </div>
        </div>
      </div>

      <div className='centerContiener'>
        <div className={isLeftTurn ? 'leftBox isTurn' : 'leftBox'}>
          <CompetitorsHandRotated numOfCards={leftHand} className="P4hand" cardClassName='sideCard' style={heightStyle(sizeCalc(leftHand))} />
          {leftWinnerCards !== 0 ? <WinnerCardsRotated numOfCards={leftWinnerCards} 
          className='P4winnerCards' 
          cardClassName='winnedSideCard' 
          style={heightStyle(sizeCalc(leftWinnerCards))} /> : null}
          <div>
            <div>{leftNickname}</div>
            {props.suitBet ? <div className='currntBet'>bet: {leftBet}</div> : null}
            {/* {isLeftTurn ? <div>current turn</div> : null} */}
          </div>
        </div>
        <div className='centerBox'>
          {props.sliceingSuit !== null ? <div className='slicingSuit'>Sliceing Suit: {shapePointer[props.sliceingSuit]} </div> : null}
          {centerCards.length !== 0 ? <Center arrayOfCards={centerCards.map(c => c[0])} className="center" /> : null}
        </div>
        <div className={isRightTurn ? 'rightBox isTurn' : 'rightBox'}  >
          <CompetitorsHandRotated 
          numOfCards={rightHand} 
          className="P2hand" cardClassName='sideCard' 
          style={heightStyle(sizeCalc(rightHand))} />
          {rightWinnerCards !== 0 ? <WinnerCardsRotated 
          numOfCards={rightWinnerCards} 
          className='P2winnerCards' 
          cardClassName='winnedSideCard' 
          style={heightStyle(sizeCalc(rightWinnerCards))}/> : null}
          <div>
            <div>{rightNickname}</div>
            {props.suitBet ? <div className='currntBet'>bet: {rightBet}</div> : null}
          </div>
        </div>
      </div>

      <div className={isMyTurn ? 'bottomContainer isTurn' : 'bottomContainer'}>
        <div className='winAndSortAndBet'>
          <div className='sortAndBet'>
            <button 
            className='smallButton' 
            onClick={() => handelSort(setMyHand, myHand, setIsSorted)} 
            disabled={IsSorted} >sort</button>
            <div>bet: {myBet}</div>
          </div>
          {myWinnerCards !== 0 ? 
          <WinnerCards 
          numOfCards={myWinnerCards} 
          className='P1winnerCards' 
          cardClassName='myWinnedCard' 
          style={widthStyle(sizeCalc(myWinnerCards))} /> : null}
          {isSuitBetting ? 
          <SuitBets 
          client={props.client} 
          clientId={props.clientId} 
          isMyTurn={isMyTurn} 
          suitBet={props.suitBet} /> : null}
          {isNumBetting ? 
          < NumBets 
          client={props.client} 
          clientId={props.clientId} 
          isMyTurn={isMyTurn} numBets={props.numBets} 
          minBet={props.minBet} 
          playerNum={props.playerNum} /> : null}
        </div>
        <Hand arrayOfCards={IsSorted ? keepSorted(myHand) : myHand} onClick={handleCardClick} className="P1hand" cardClassName='myCard' shouldDisable={!isMyTurn || isSuitBetting || isNumBetting || isDisabled} />
      </div>
    </div>
  )
}
