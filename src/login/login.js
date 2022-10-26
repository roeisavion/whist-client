import React from 'react';
import { useState } from 'react';
import './button.css'
import './login.css'
import { joinGame, createGame } from './loginFunctions';
import Input from '@mui/material/TextField'
// import { Button, colors } from '@mui/material';
import _ from 'lodash';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1f0163',
        },
        secondary: {
            main: '#ff0000',
        }
    },
    typography: {
        fontFamily: 'Fuzzy Bubbles'
    }
});

const labelText = {
    join: `Doesn't have a game ID yet ? Create one `,
    create: `Already have a game ID ? Join the game `
}

export const Login = (props) => {
    let newNickname;
    let client = props.client;
    let clientId = props.clientId;
    const [gameId, setGameId] = useState("");
    const [nickname, setNickname] = useState(null);
    const [finelNickName, setFinelNickName] = useState("");
    const [isJoin, setIsJoin] = useState(true);


    const [gameIdError, setGameIdError] = useState(false)
    const handelGameIdChange = (event) => {
        setGameId(event.target.value);
        // setGameIdError(_.isEmpty(gameId) ? true : false)
    }

    const [nicknameError, setNicknameError] = useState(false)

    const handelNicknameChange = (event) => {
        newNickname = event.target.value
        setNickname(newNickname)
        setNicknameError(_.isEmpty(newNickname))
    } // check on next render


    return <ThemeProvider theme={theme}>
        <div className="login" >
            {/* <div className="loginBox"> */}
            {/* <div> */}
            <Input
                placeholder="Choose a nickname"
                error={nicknameError}
                helperText={nicknameError ? 'Must enter a nickname' : ' '}
                label="Choose a nickname"
                onChange={handelNicknameChange}
                onPaste={handelNicknameChange}
                onCut={handelNicknameChange}
            />
            {/* </div> */}
            {/* </div> */}
            { }
            {/* <div className='smallContainer'> */}
            {isJoin ? <><Input
                id="gameIdInput"
                placeholder="Enter gameId"
                label="Enter gameId"
                // error={gameIdError}
                // helperText={gameIdError ? 'Must enter a gameId' : ' '}
                onChange={handelGameIdChange}
                onPaste={handelGameIdChange}
                onCut={handelGameIdChange}
                onLoad={handelGameIdChange} /><button
                    id='joinButton'
                    onClick={() => joinGame(client, clientId, gameId, nickname, setNicknameError, setGameIdError, setFinelNickName)}
                    className='button'
                    disabled={props.inGame}>
                    Join Game
                </button></>
                : <button
                    id='createButton'
                    onClick={() => createGame(client, clientId, nickname, setNicknameError, setFinelNickName)}
                    className='button'
                    disabled={props.inGame}>
                    Create Game
                </button>}

            {/* </div> */}
            <div>
                <span className='blackText'>{isJoin ? labelText['join'] : labelText['create']}</span>
                <span className='link' onClick={() => setIsJoin(!isJoin)}>here</span>
            </div>
        </div>
    </ThemeProvider>
}



// MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input
// MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input