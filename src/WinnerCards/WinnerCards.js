import { UnClickableCard } from '../Card/UnClickableCard'
import '../Card/Card.css';

export const WinnerCards = (props) => {
  let cards = new Array(props.numOfCards)
  cards.fill(<div className='card-container'><UnClickableCard cardName="blue_back" className={props.cardClassName}/></div>)
  return <div style={props.style} className={props.className}>{cards}</div>;
}


export const WinnerCardsRotated = (props) => {
  let cards = new Array(props.numOfCards)
  cards.fill(<div className='sideCard-container'><UnClickableCard cardName="blue_back_rotate" className={props.cardClassName}/></div>)
  return <div style={props.style} className={props.className}>{cards}</div>;
}
