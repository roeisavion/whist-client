export const UnClickableCard = (props) =>
(
  <img
    src={`./PNG/${props.cardName}.png`}
    alt='something went wrong'
    className={props.className}
    originHand = {props.originHand}
    id={props.cardName}>
  </img>
)

  // onClick={() => props.onClick(props.cardName)}