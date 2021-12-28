import { ClickableCard } from '../Card/ClickableCard'
import { UnClickableCard } from '../Card/UnClickableCard'
import '../Card/Card.css';

export const CompetitorsHand = (props) => {
  let cards = new Array(props.numOfCards)
  cards.fill(<UnClickableCard cardName="blue_back" className={props.cardClassName}/>)
  return <div className={props.className}>{cards}</div>;
}

{/* <div  width= "90" height= "60"></div> */}