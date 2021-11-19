export const getSuit = ((cardString) => cardString.charAt(cardString.length-1));
export const getNumber = ((cardString) => cardString.slice(0,cardString.length-1));

export const cardsNumberOrder = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
export const suitOrder = ['C','D','S','H'];