//const number = [{1:'2'},{2:'3'},{3:'4'},{4:'5'},{5:'6'},{6:'7'},{7:'8'},{8:'9'},{9:'10'},{10:'J'},{11:'Q'},{12:'K'},{13:'A'}];
//const suit = [{1:'C'},{2:'D'},{3:'S'},{4:'H'}];

export const cardsNumberOrder = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
export const suitOrder = ['H','S','D','C'];

export function createDeck(){
    let deck = []
    for (let num of cardsNumberOrder){
        for (let s of suitOrder){
            deck.push(num+s)
        }
    }
    return deck
}


export function shuffleDeck(deck){
    let shuffledDeck = deck.sort(() => Math.random() - 0.5)
    return shuffledDeck
}

// const newDeck = createDeck();
// let shuffledDeck =shuffleDeck(newDeck)

