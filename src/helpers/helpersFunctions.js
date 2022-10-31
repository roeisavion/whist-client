export const getSuit = ((cardString) => cardString.charAt(cardString.length-1));
export const getNumber = ((cardString) => cardString.slice(0,cardString.length-1));

export const cardsNumberOrder = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
export const suitOrder = ['C','D','S','H'];

export const removeNullValues = arr => {
    for(let i = 0; i < arr.length; ){
       // null's datatype is object and it is a false value
       // so only falsy object that exists in JavaScript is null
       if(typeof arr[i] === 'object' && !arr[i]){
          arr.splice(i, 1);
       }else{
          i++;
          continue;
       };
    };
 };