import { useParams } from "react-router-dom";

export const Loader = ({client, clientId}) =>{

    const nickname =  localStorage.getItem('nickname')
    let { gameId } = useParams();
    let payLoad = {
        "method": "join",
        gameId,
        nickname,
        clientId
    }

    if(clientId){
        client.send(JSON.stringify(payLoad))
    }

    return <div>loading</div>
}