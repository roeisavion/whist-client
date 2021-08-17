import React, { useEffect, useState } from 'react';

let response;
export const Login = (props) => {
    // useEffect(() =>{

        props.client.onopen = () => {
            alert('WebSocket Client Connected');
        };
        props.client.onmessage = (message) => {
            response = JSON.parse(message.data);
            clientId = response.clientId;
            if (response.method === "connect") {
                alert("Client id Set successfully " + clientId)
            }
            // created game
            if (response.method === "create") {
                gameId = response.game.id;
                alert("Game was created Set successfully " + gameId)
            }
            if (response.method === "playerJoined") {
                gameId = response.game.id;
                alert(`player ${clientId} has entered game ${gameId}`)
            }
            if (response.method === "updateCards") {
                alert(response.cardsMap[response.playerNum])
            }
        };
    // },[])
    
    let clientId = null;
    let gameId = null;
    const createGame = () => {
        let payLoad = {
            "method": "create",
            "clientId": clientId
        }
        props.client.send(JSON.stringify(payLoad));
    }
    const joinGame = () => {
        gameId = document.getElementById("gameIdInput").value;
        let payLoad = {
            "method": "join",
            "clientId": clientId,
            "gameId": gameId
        }
        props.client.send(JSON.stringify(payLoad));
    }

    return <div className="login">
        <h1>Wolcome!</h1>
        <button id='joinButton' onClick={joinGame} >Join Game</button>
        <button id='createButton' onClick={createGame}>Create Game</button>
        <input id="gameIdInput" placeholder="enter gameId"></input>
    </div>
}
