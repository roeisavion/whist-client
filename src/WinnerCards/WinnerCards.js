import { UnClickableCard } from '../Card/UnClickableCard'
import '../Card/Card.css';

export const WinnerCards = (props) => {
  let cards = new Array(props.numOfCards)
  cards.fill(<UnClickableCard cardName="blue_back" className={props.cardClassName} />)
  return <div className={props.className}>{cards}</div>;
  // let cards = props.arrayOfCards.map((card) => <UnClickableCard cardName={"blue_back"} key={card} className={props.cardClassName} />);
  // return <div className={props.className}>{cards}</div>;
}


export const WinnerCardsRotated = (props) => {
  // let cards = props.arrayOfCards.map((card) => <UnClickableCard cardName={"blue_back_rotate"} key={card} className={props.cardClassName} />);
  // return <div className={props.className}>{cards}</div>;
  let cards = new Array(props.numOfCards)
  cards.fill(<UnClickableCard cardName="blue_back_rotate" className={props.cardClassName} />)
  return <div className={props.className}>{cards}</div>;
}
