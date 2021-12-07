import _ from 'lodash';
import { useEffect, useState } from 'react';
import './Bets.css'
// import { sendSuitBet, sendPass } from './suitBetsFunctions.js'


export const NumBets = (props) => {
    let client = props.client;
    let clientId = props.clientId;
    const [myBetNum,setMyBetNum] = useState(0)
    const handelNumChange = (event) => {
        setMyBetNum(event.target.value)
    }

    return <div className = "bets">
        <div>
        <input type="number" placeholder="write your bet" id="betNum" name="betNum" min={props.minBet[1]===props.playerNum ? props.minBet[0] : 0}  max={13} onChange={handelNumChange} />
            <button onClick={() => sendNumBet(client,clientId, myBetNum, props.numBets)} disabled={!props.isMyTurn}>submit</button>
        </div>
    </div>
}


const sendNumBet = (client, clientId, myBetNum, numBets) => {
    let realBets;
    let payLoad = {
        "method": "numBet",
        clientId,
        myBetNum
      }
    try {
        realBets = Object.values(numBets);
        realBets = realBets.filter(nb => nb)
        let realBets1 = realBets.map(nb => parseInt(nb))
        if(realBets.length === 3 && (_.sum(realBets1) + parseInt(myBetNum))===13){
            alert("the sum of bets can't be 13")
        }else{
            client.send(JSON.stringify(payLoad));
        }

    } catch (error) {
        client.send(JSON.stringify(payLoad));
    }
  }
