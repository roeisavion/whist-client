import { getNumber, getSuit, cardsNumberOrder, suitOrder } from "../../helpers/helpersFunctions";

export const handelSort = (setHand, arrayOfCards, setIsSorted) => {
    let sortedArry = sortHand([...arrayOfCards])
    setHand(sortedArry)
    setIsSorted(true)
}

export const keepSorted = (arrayOfCards) => {
    return sortHand([...arrayOfCards])
}


const sortHand = (hand) => {
    return hand.sort(orderByShape)
}

const orderByShape = (cardA, cardB) => {
    let cardANum = getNumber(cardA);
    let cardASuit = getSuit(cardA);
    let cardBNum = getNumber(cardB);
    let cardBSuit = getSuit(cardB);
    let res = 1;

    if (suitOrder.indexOf(cardASuit) < suitOrder.indexOf(cardBSuit)) {
        res = -1;
    }
    if (suitOrder.indexOf(cardASuit) === suitOrder.indexOf(cardBSuit)) {
        if (cardsNumberOrder.indexOf(cardANum) < cardsNumberOrder.indexOf(cardBNum)) {
            res = -1;
        }
    }
    return res;
}