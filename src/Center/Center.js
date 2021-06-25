import {Card} from '../Card/Card'

export const Center = (props) => {
    //console.log(props.arrayOfCards);
    let cards = props.arrayOfCards.map((card) => <Card cardName={card} key={card}/>);
    return <div className="center">{cards}</div>;
  }