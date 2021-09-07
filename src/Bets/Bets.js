import './Bets.css'

export const Bets = (props) => {
    let client = props.client;
    let clientId = props.clientId;
    return <div className = "bets">
        <div>
        <input type="number" placeholder="write your bet" id="betNum" name="betNum" min="0" max="13"/>
            <select id="suit">
                <option value="H">H</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="S">S</option>
            </select>
            <button onClick={props.sendSuitBet(client,clientId)}>submit</button>
        </div>
        <div>
            <button onClick={props.sendPass(client,clientId)}>Pass</button>
        </div>
    </div>
}

