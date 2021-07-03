import {Card} from '../Card/Card'
import '../Card/Card.css';

export const WinnerCards = (props) => {
    let cards = props.arrayOfCards.map((card) => <Card cardName={card} key={card} />);
    return <div className={props.className}>{cards}</div>;
  }
