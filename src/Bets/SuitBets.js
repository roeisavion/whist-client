import { useEffect, useState } from 'react';
import './Bets.css'
import { sendSuitBet, sendPass } from './suitBetsFunctions.js'


export const SuitBets = (props) => {
    let client = props.client;
    let clientId = props.clientId;
    const [suitBetNum,setSuitBetNum] = useState(0)
    const [betSuit,setBetSuit] = useState("H")
    const handelNumChange = (event) => {
        setSuitBetNum(event.target.value)
    }
    const handelSuitChange = (event) => {
        setBetSuit(event.target.value)
    }

    return <div className = "bets">
        <div>
        <input type="number" placeholder="write your bet" id="betNum" name="betNum" min="3" max="13" onChange={handelNumChange} />
            <select id="suit" onChange={handelSuitChange}>
                <option value="H">H</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="S">S</option>
            </select>
            <button onClick={() => sendSuitBet(client,clientId,suitBetNum,betSuit,props.suitBet)} disabled={!props.isMyTurn}>submit</button>
        </div>
        <div>
            <button onClick={() => sendPass(client,clientId)} disabled={!props.isMyTurn}>Pass</button>
        </div>
    </div>
}

