import _ from 'lodash';
import { useState } from 'react';
import './Bets.css'
import './NumberInput.css'
import { NumberInput } from './NumberInput';
import { removeNullValues } from 'helpers/helpersFunctions';

export const NumBets = (props) => {
    let client = props.client;
    let clientId = props.clientId;
    const [myBetNum, setMyBetNum] = useState(props.minBet[1] === props.playerNum ? props.minBet[0] : 0)
    const handelNumChange = (event) => {
        setMyBetNum(event.target.value)
    }

    return <div className="bets">
        <div>
            {props.isMyTurn ? <div>place your Bet</div> : null}
            <div className='numBets'>
                <NumberInput min={props.minBet[1] === props.playerNum ? props.minBet[0] : 0} max={13} setMyBetNum={setMyBetNum} myBetNum={myBetNum} />
                {/* <input aria-label='number bet' className='numInput' type="number" placeholder="write your bet" id="betNum" name="betNum" min={props.minBet[1] === props.playerNum ? props.minBet[0] : 0} max={13} onChange={handelNumChange} /> */}
                <button className='smallButton' onClick={() => sendNumBet(client, clientId, myBetNum, props.numBets, props.minBet, props.playerNum)} disabled={!props.isMyTurn}>submit</button>
            </div>
        </div>
    </div>
}


const sendNumBet = (client, clientId, myBetNum, numBets, minBet, playerNum) => {
    let realBets;
    let payLoad = {
        "method": "numBet",
        clientId,
        myBetNum
    }
    if (parseInt(myBetNum) < parseInt(minBet) && minBet[1] === playerNum) {
        alert("can not bet a number under your original bet") //gramer
        return
    }
    // if(parseInt(myBetNum) < 0){
    //     alert("f u");
    //     return
    // } 
    if (myBetNum % 1 !== 0 || parseInt(myBetNum) < 0) {
        alert("f u");
        return
    }
    try {
        realBets = Object.values(numBets);
        // realBets = realBets.map(nb => nb.toString())
        // realBets = realBets.filter(nb => nb)
        removeNullValues(realBets);
        let realBets1 = realBets.map(nb => parseInt(nb))
        if (realBets.length === 3 && (_.sum(realBets1) + parseInt(myBetNum)) === 13) {
            alert("the sum of bets can't be 13")
        } else {
            client.send(JSON.stringify(payLoad));
        }

    } catch (error) {
        client.send(JSON.stringify(payLoad));
    }
}


