export const Card = (props) =>
(
  <img
    src={`./PNG/${props.cardName}.png`}
    alt='something went wrong'
    className="card"
    id={props.cardName}
    onClick={() => props.onClick(props.cardName)} >
  </img>
)

  // onClick={() => props.onClick(props.cardName)}