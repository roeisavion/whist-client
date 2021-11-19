import React from 'react';
import { joinButton } from './loginComponents';
// import { leaveGame } from './loginFunctions';

export const Login = (props) => {
    return <div className="login" >
        <h1> Welcome!</h1>
        <button id='joinButton' onClick={props.joinGame} className='button'>Join Game</button>
        <button id='createButton' onClick={props.createGame} className='button'>Create Game</button>
        <button id='leaveButton' onClick={props.leaveGame} className='button'>Leave Game</button>
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