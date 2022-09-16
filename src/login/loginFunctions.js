import _ from 'lodash';
import { useNavigate } from "react-router-dom";


export const createGame = (client, clientId, nickname, setNicknameError,setFinelNickName) => {
  if (nickname) {
    let payLoad = {
      "method": "create",
      nickname,
      clientId
    }
    client.send(JSON.stringify(payLoad));
    setFinelNickName(nickname)
  }
  else {
    // alert("must send a nickName")
    setNicknameError(_.isEmpty(nickname) ? true : false)
    // nicknameElemnt.setCustomValidity("must send a nickName")
  }
}
export const joinGame = (client, clientId, gameId, nickname, setNicknameError, setGameIdError,setFinelNickName) => {
  if (!!nickname && !!gameId) {
    let payLoad = {
      "method": "join",
      clientId,
      nickname,
      gameId
    }
    client.send(JSON.stringify(payLoad));
    setFinelNickName(nickname)
  }
  if (!gameId) {
    // alert("must send gameID")
    setGameIdError(true)
  }
  if (!nickname) {
    // alert("must send nickName")
    setNicknameError(true)
  }
}

export const leaveGame = (client, clientId, navigate) => {
  let payLoad = {
    "method": "leaveGame",
    clientId
  }
  client.send(JSON.stringify(payLoad));
  navigate('/')
}