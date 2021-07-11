import { getSuit, getNumber } from '../../src/helpers/helpersFunctions'
import { cardsNumberOrder, suitOrder } from '../deck.jsx'


export const notYourTurnCardClick = () => {
    alert('not your turn')
}

export const notLegalMove = () => {
    alert('not a ligal move')
}

// export const clickRouter = (isTurn,IslegalCard,clickedCard, originHand) =>{
//     if (!isTurn){
//         return notYourTurnCardClick
//     }
//     if (!IslegalCard){
//         return notLegalMove
//     }
//     return handleCardClick(clickedCard,originHand)
// }

export const removeCard = (clickedCard, currentHand) => {
    return currentHand.filter(currentCard => currentCard !== clickedCard)
}

export const nextTurn = {
    P1: 'P2',
    P2: 'P3',
    P3: 'P4',
    P4: 'P1'
}

export const caculateRoundWinner = (centerCards) => {
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

export const compareCards = (cardA, cardB) => {
    let cardASuit = getSuit(cardA);
    let cardBSuit = getSuit(cardB);
    let cardANum = getNumber(cardA);
    let cardBNum = getNumber(cardB);
    if (cardASuit === cardBSuit) {
        let a = cardsNumberOrder.indexOf(cardANum)
        let b = cardsNumberOrder.indexOf(cardBNum)
        return b - a
    }
    else {
        let c = suitOrder.indexOf(cardASuit)
        let d = suitOrder.indexOf(cardBSuit)
        return c - d
        
    }
}