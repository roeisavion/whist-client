import {Card} from '../Card/Card'
import '../Card/Card.css';

export const Hand = (props) => {
    //console.log(props.arrayOfCards);
    let cards = props.arrayOfCards.map((card) => <Card cardName={card} key={card} onClick={props.onClick} />);
    return <div className="hand">{cards}</div>;
  }

    // onClick={() => props.onClick(props.cardName)}