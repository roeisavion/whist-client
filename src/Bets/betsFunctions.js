export const sendSuitBet = (client,clientId) => {
    let suit = document.getElementById("suit").value;
    let betNum = document.getElementById("betNum").value;
    let payLoad = {
        "method": "suitBet",
        clientId,
        betNum,
        suit,
        "pass": false

      }
    client.send(JSON.stringify(payLoad));
}

export const sendPass = (client,clientId) => {
    let payLoad = {
        "method": "suitBet",
        clientId,
        "pass": true

      }
    client.send(JSON.stringify(payLoad));
}