import {UnClickableCard} from '../Card/UnClickableCard'
import './Center.css';

export const Center = (props) => {
    let cards = props.arrayOfCards.map((card) => <UnClickableCard cardName={card} key={card} className="centerCard"/>);
    return <div className='center'>{cards}</div>;
  }