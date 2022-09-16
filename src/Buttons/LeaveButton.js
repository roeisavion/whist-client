import React from 'react';
import './LeaveButton.css'
import '../login/button.css'


const LeaveButton = (props) => {
    return <div className="leaveButton">
    <button
        // id='leaveButton'
        onClick={() => leaveGame(client, clientId)}
        className='button'
        // disabled={!props.inGame}
        >
        Leave Game
    </button>
</div>;
}
 
export default LeaveButton;