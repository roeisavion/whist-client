import { ClickableCard } from '../Card/ClickableCard'
import { UnClickableCard } from '../Card/UnClickableCard'
import '../Card/Card.css';

export const CompetitorsHand = (props) => {
  let cards = new Array(props.numOfCards)
  cards.fill(<UnClickableCard cardName={props.className ==="P3hand" ? "blue_back" : "blue_back_rotate"} className={props.cardClassName}/>)
  return <div className={props.className}>{cards}</div>;
}

{/* <div  width= "90" height= "60"></div> */}