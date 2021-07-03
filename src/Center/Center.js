import {UnClickableCard} from '../Card/UnClickableCard'

export const Center = (props) => {
    //console.log(props.arrayOfCards);
    let cards = props.arrayOfCards.map((card) => <UnClickableCard cardName={card} key={card}/>);
    return <div className="center">{cards}</div>;
  }