import { ClickableCard } from '../Card/ClickableCard'
import '../Card/Card.css';

export const Hand = (props) => {
  let cards = props.arrayOfCards.map((card) => <ClickableCard cardName={card} key={card} onClick={props.onClick} originHand={props.className} />);
  return <div className={props.className}>{cards}</div>;
}

