export const ClickableCard = (props) =>
(
  <img
    src={`./PNG/${props.cardName}.png`}
    alt='something went wrong'
    className="card"
    originHand = {props.originHand}
    id={props.cardName}
    onClick={() => props.onClick(props.cardName, props.originHand)} >
  </img>
)

  // onClick={() => props.onClick(props.cardName)}