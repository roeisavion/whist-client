import { UnClickableCard } from '../Card/UnClickableCard'
import '../Card/Card.css';

export const CompetitorsHand = (props) => {
  let cards = new Array(props.numOfCards)
  cards.fill(<div className='card-container'><UnClickableCard cardName="purple_back" className={props.cardClassName}/></div>)
  return <div style={props.style} className={props.className}>{cards}</div>;
}

export const CompetitorsHandRotated = (props) => {
  let cards = new Array(props.numOfCards)
  cards.fill(<div className='sideCard-container'><UnClickableCard cardName="purple_back_rotate" className={props.cardClassName}/></div>)
  return <div style={props.style} className={props.className}>{cards}</div>;
}
