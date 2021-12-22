import React from 'react';
import { useState } from 'react';
import './button.css'
import './login.css'
import { joinGame, createGame, leaveGame } from './loginFunctions';
import { NicknameInput } from './Nickname'
import TextField from '@mui/material/TextField'
import Input from '@mui/material/TextField'
import { Button } from '@mui/material';
import _ from 'lodash';

export const Login = (props) => {
    let client = props.client;
    let clientId = props.clientId;
    const [gameId, setGameId] = useState("")
    const [nickname, setNickname] = useState(null)
    const [finelNickName, setFinelNickName] = useState("")
    
    const [gameIdError, setGameIdError] = useState(false)
    const handelGameIdChange = (event) => {
        setGameId(event.target.value)
        setGameIdError(_.isEmpty(gameId) ? true : false)
    }

    const [nicknameError, setNicknameError] = useState(false)
    const handelNicknameChange = (event) => {
        setNickname(event.target.value)
        setNicknameError(_.isEmpty(nickname) ? true : false)
    }

    const handelNicknameSubmit = () => {
        setFinelNickName(nickname);
    }



    return <div className="login" >
        <h1> {"Welcome!" + finelNickName}</h1>
        <div className="loginBox">
            <div>
                <Input 
                placeholder="Choose a nickname" 
                error={nicknameError} 
                helperText={nicknameError ? 'Must enter a nickname' : ' '} 
                label="Choose a nickname" 
                onChange={handelNicknameChange} 
                />
            </div>
        </div>
        <button 
        id='createButton' 
        onClick={() => createGame(client, clientId, nickname,setNicknameError,setFinelNickName)} 
        className='button' 
        disabled={props.inGame}>
            Create Game
            </button>
        <div 
        className='smallContainer'>
            <button 
            id='joinButton' 
            onClick={() => joinGame(client, clientId, gameId, nickname, setNicknameError, setGameIdError,setFinelNickName)} 
            className='button' 
            disabled={props.inGame}>
                Join Game
                </button>
            <Input 
            id="gameIdInput" 
            placeholder="Enter gameId" 
            label="Enter gameId" 
            error={gameIdError} 
            helperText={gameIdError ? 'Must enter a gameId' : ' '} 
            onChange={handelGameIdChange} 
            />
        </div>
        <div className="leaveButton">
            <button 
            id='leaveButton' 
            onClick={() => leaveGame(client, clientId)} 
            className='button' 
            disabled={!props.inGame}>
                Leave Game
                </button>
        </div>
    </div>
}


