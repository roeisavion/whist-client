import { getNumber, getSuit, cardsNumberOrder, suitOrder } from "../helpers/helpersFunctions";
import _ from 'lodash';

export const sendSuitBet = (client, clientId, betNum, betSuit, suitBet) => {

  let previousBet = biggestBetSoFar(suitBet);
  let payLoad = {
    "method": "suitBet",
    clientId,
    betNum,
    betSuit,
    "pass": false
  }
  if (previousBet) {
    if (isBiggerBet(betNum.toString() + betSuit, previousBet)) {
      client.send(JSON.stringify(payLoad));
    }
    else {
      alert("your bet needs to be bigger then the previous bet")
    }
  }else{ 
    client.send(JSON.stringify(payLoad));
  }
}

export const sendPass = (client, clientId) => {
  let payLoad = {
    "method": "suitBet",
    clientId,
    "pass": true

  }
  client.send(JSON.stringify(payLoad));
}

export const isBiggerBet = (bet, previousBet) => {
  let betNum = getNumber(bet);
  let betSuit = getSuit(bet);
  let prevBetNum = getNumber(previousBet);
  let prevBetSuit = getSuit(previousBet);
  let bool = true;
  if (previousBet) {
    if (cardsNumberOrder.indexOf(prevBetNum) > cardsNumberOrder.indexOf(betNum)) {
      bool = false;
      return bool;
    }
    if (cardsNumberOrder.indexOf(prevBetNum) === cardsNumberOrder.indexOf(betNum)) {
      if (suitOrder.indexOf(prevBetSuit) >= suitOrder.indexOf(betSuit)) {
        bool = false;
      }
    }
  }
  return bool;
}

export const biggestBetSoFar = (suitBet) => {
  let realBets;
  try {
    realBets = Object.values(suitBet) 
  } catch (error) {
    return null
  }
  realBets = realBets.filter(sb => sb)
  realBets = realBets.filter(sb => sb != 'PASS')
  let bigBet = realBets[0];
  if(realBets.length > 1){
    for (let i = 1; i < realBets.length; i++) {
      if (isBiggerBet(realBets[i], bigBet)) {
        bigBet = realBets[i]
      }
    }
  }
  return bigBet;
}


      // const biggestBet = (suitBet) => {
      //   let realBets = Object.values(suitBet).filter(sb => sb != null || 'PASS')
      //   if (_.isEmpty(realBets)){
      //     return null
      //   }
      //   _.maxBy(realBets, biggerBet)
      // }