export const createGame = (client,clientId) => {
    let payLoad = {
      "method": "create",
      "clientId": clientId
    }
    client.send(JSON.stringify(payLoad));
  }
export const joinGame = (client,clientId) => {
    let gameId = document.getElementById("gameIdInput").value;
    let payLoad = {
      "method": "join",
      "clientId": clientId,
      "gameId": gameId
    }
    client.send(JSON.stringify(payLoad));
  }

  export const leaveGame = (client,clientId) => {
    let payLoad = {
      "method": "leaveGame",
      "clientId": clientId
    }
    client.send(JSON.stringify(payLoad));
  }