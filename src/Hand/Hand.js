import { ClickableCard } from '../Card/ClickableCard'
import '../Card/Card.css';

export const Hand = (props) => {
  const cards = props.arrayOfCards.map((card) => <ClickableCard 
  cardName={card} 
  key={card} 
  onClick={props.onClick} 
  originHand={props.className} 
  className={props.cardClassName}
  shouldDisable = {props.shouldDisable}/>);
  return <div className={props.className}>{cards}</div>;
}