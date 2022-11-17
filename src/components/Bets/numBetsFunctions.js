import { getNumber, getSuit, cardsNumberOrder, suitOrder } from "../../helpers/helpersFunctions";
import _ from 'lodash';

export const sendNumBet = (client, clientId, betNum, numBet) => {

  let payLoad = {
    "method": "numBet",
    clientId,
    betNum
  }
  client.send(JSON.stringify(payLoad));
}
