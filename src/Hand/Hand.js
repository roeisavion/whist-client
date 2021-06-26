import { Card } from '../Card/Card'
import '../Card/Card.css';

export const Hand = (props) => {
  let cards = props.arrayOfCards.map((card) => <Card cardName={card} key={card} onClick={props.onClick} />);
  return <div className="hand">{cards}</div>;
},

export const P2Hand = (props) => {
  let cards = props.arrayOfCards.map((card) => <Card cardName={card} key={card} onClick={props.onClick} />);
  return <div className="P2hand">{cards}</div>;
}


// onClick={() => props.onClick(props.cardName)}

const handHight = {
  P1 = "10px",
  P2 = "120px",
  P3 = "230px",
  P4 = "340px"
}