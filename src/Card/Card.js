export function Card(props) {
    return <img src={`./PNG/${props.cardName}.png`} alt='something went wrong' className="card" width='70' height='100' onClick={() => props.onClick(props.cardName)} ></img>
  }

  // onClick={() => props.onClick(props.cardName)}