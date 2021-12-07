import {UnClickableCard} from '../Card/UnClickableCard'
import '../Card/Card.css';

export const WinnerCards = (props) => {
    let cards = props.arrayOfCards.map((card) => <UnClickableCard cardName={card} key={card} className={props.cardClassName} />);
    return <div className={props.className}>{cards}</div>;
  }
