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
});

export const Login = (props) => {
    let newNickname;
    let client = props.client;
    let clientId = props.clientId;
    const [gameId, setGameId] = useState("")
    const [nickname, setNickname] = useState(null)
    const [finelNickName, setFinelNickName] = useState("")

    const [gameIdError, setGameIdError] = useState(false)
    const handelGameIdChange = (event) => {
        setGameId(event.target.value)
        // setGameIdError(_.isEmpty(gameId) ? true : false)
    }

    const [nicknameError, setNicknameError] = useState(false)

    const handelNicknameChange = (event) => {
        newNickname = event.target.value
        setNickname(newNickname)
        // setNickname(event.target.value)
        // console.log(nickname)
        // console.log(newNickname)
        setNicknameError(_.isEmpty(newNickname))
        // setNicknameError(_.isEmpty(nickname))
    } // check on next render

    // useEffect(() => { setNicknameError(_.isEmpty(nickname) ? true : false) }
    //     , [nickname])

    // useEffect(() => { setGameIdError(_.isEmpty(gameId) ? true : false) }
    //     , [gameId])

    // const handelNicknameSubmit = () => {
    //     setFinelNickName(nickname);
    // }



    return <ThemeProvider theme={theme}>
        <div className="login" >
            <div className="loginBox">
                {/* {props.isGameCreatedModal ? <GameCreatedModal
                setisGameCreatedModal={props.setisGameCreatedModal}
                gameId={props.gameId} /> : null} */}
                {/* {props.isLeftGameModal ? <LeftGameModal
                setIsLeftGameModal={props.setIsLeftGameModal}
                nickname={nickname} /> : null} */}

                {/* <h1> {"Welcome " + finelNickName}</h1> */}
                {/* <img className='cardsPic' src={`./PNG/aces.png`} /> */}
                <div>
                    <Input
                        placeholder="Choose a nickname"
                        error={nicknameError}
                        helperText={nicknameError ? 'Must enter a nickname' : ' '}
                        label="Choose a nickname"
                        onChange={handelNicknameChange}
                        onPaste={handelNicknameChange}
                        onCut={handelNicknameChange}
                        sx={{ ".MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline": { "& > fieldset": { border: '1px solid green' } } }}

                    // onLoad={handelNicknameChange}

                    />
                </div>
            </div>
            <button
                id='createButton'
                onClick={() => createGame(client, clientId, nickname, setNicknameError, setFinelNickName)}
                className='button'
                disabled={props.inGame}>
                Create Game
            </button>
            <div
                className='smallContainer'>
                <Input
                    // disableUnderline
                    id="gameIdInput"
                    placeholder="Enter gameId"
                    label="Enter gameId"
                    // error={gameIdError}
                    // helperText={gameIdError ? 'Must enter a gameId' : ' '}
                    onChange={handelGameIdChange}
                    onPaste={handelGameIdChange}
                    onCut={handelGameIdChange}
                    onLoad={handelGameIdChange}
                />
                <button
                    id='joinButton'
                    onClick={() => joinGame(client, clientId, gameId, nickname, setNicknameError, setGameIdError, setFinelNickName)}
                    // onClick={() => joinGame(client, clientId, gameId, nickname, setNicknameError, setFinelNickName)}
                    className='button'
                    disabled={props.inGame}>
                    Join Game
                </button>
            </div>
            {/* {props.game ? <WaitingRoom game={props.game} /> : null} */}
            {/* <div className="leaveButton">
            <button
                id='leaveButton'
                onClick={() => leaveGame(client, clientId)}
                className='button'
                disabled={!props.inGame}>
                Leave Game
            </button>
        </div> */}
        </div>
    </ThemeProvider>
}




// MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input
// MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input