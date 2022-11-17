import React from 'react';
import './LeaveButton.css'
import '../login/button.css'
import { leaveGame } from '../login/loginFunctions';
import { useNavigate } from "react-router-dom";



const LeaveButton = (props) => {
    let navigate = useNavigate();
    // let client, clientId = {props}
    return <div className="leaveButton">
    <button
        // id='leaveButton'
        onClick={() => leaveGame(props.client, props.clientId, navigate)}
        className='button'
        // disabled={!props.inGame}
        
        >
        Leave Game
    </button>
</div>;
}
 
export default LeaveButton;