import { useState, useMemo, useCallback } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import './WaitingRoom.css'
import { useParams } from "react-router-dom";


export const WaitingRoom = (props) => {
    const clients = props.game.clients;

    const [isCopied, setIsCopied] = useState(false)
    const createData = useCallback(() => (
        Object.values(clients).map(c => {
            const { playerNum, nickname } = c;
            return <tr key={playerNum}>
                <td>{fullName[playerNum] + ":"}</td>
                <td>{nickname}</td>
            </tr>;
        })), [clients])


    const data = createData();
    return <div className="waitingRoom">
        <h3>players in room :</h3>
        <table>
            <tbody>
                {data}
            </tbody>
        </table>
        <div className='gameIdBox'>GameID: {props.game.gameId}
            <CopyToClipboard text={props.game.id}
                onCopy={() => setIsCopied(true)}>
                <button className='button copyButton' disabled={isCopied}>{isCopied ? "copied" : 'Copy'}</button>
            </CopyToClipboard></div>
    </div>
}

const fullName = {
    P1: "player 1",
    P2: "player 2",
    P3: "player 3",
    P4: "player 4"
}