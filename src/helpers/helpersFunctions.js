export const getSuit = ((cardString) => cardString.charAt(cardString.length-1));
export const getNumber = ((cardString) => cardString.slice(0,cardString.length-1));