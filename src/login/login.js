import React from 'react';
import { joinButton } from './loginComponents';
import { joinGame } from './loginFunctions';

export const Login = (props) => {
    return <div className="login" >
        <h1> Welcome!</h1>
        {/* <button onClick={() => joinGame(props.client, props.clientId)} className='button'>Join Game</button> */}
        <button id='joinButton' onClick={props.joinGame} className='button'>Join Game</button>
        <button id='createButton' onClick={props.createGame} className='button'>Create Game</button> 
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