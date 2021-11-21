import React from 'react';
import './button.css'

export const Login = (props) => {
    return <div className="login" >
        <h1> Welcome!</h1>
        <button id='joinButton' onClick={props.joinGame} className='button' disabled={props.inGame}>Join Game</button>
        <button id='createButton' onClick={props.createGame} className='button' disabled={props.inGame}>Create Game</button>
        <button id='leaveButton' onClick={props.leaveGame} className='button' disabled={!props.inGame}>Leave Game</button>
        <input id="gameIdInput" placeholder="enter gameId" ></input>
        <input id="nicknameInput" placeholder="enter nickname"></input>
    </div>
}





// export const Login = (props) => {
//     return <div className="login">
//         <h1>Welcome!</h1>
//         <button id='joinButton' onClick={props.joinGame}>Join Game</button>
//         <button id='createButton' onClick={props.createGame} >Create Game</button>
//         <input id="gameIdInput" placeholder="enter gameId"></input>
//         <input id="nicknameInput" placeholder="enter nickname" required></input>
//     </div>
// }