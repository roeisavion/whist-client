import { WaitingRoom } from './WaitingRoom/WaitingRoom';
import { LeftGameModal } from '../components/Modals/LeftGameModal';
import LeaveButton from '../components/Buttons/LeaveButton';
import { useParams } from "react-router-dom";
import { send } from 'helpers/connectionRetry';



export const WaitingRoomPage = (props) => {
    const game = props.game;
    let { gameId } = useParams();
    if(!game) {
        const nickName = localStorage.getItem("nickName")
        let payLoad = {
            "method": "join",
            gameId,
            nickName
        }
        send(props.client,JSON.stringify(payLoad))
        // props.client.onopen(() => props.client.send(JSON.stringify(payLoad)))
    }

    const clients = props.game.clients;
    return <div className='waitingRoomContainer'>
        {props.isLeftGameModal ? <LeftGameModal
            setIsLeftGameModal={props.setIsLeftGameModal}
            nickname={props.nickname} /> : null}
        <WaitingRoom game={props.game} />
        <LeaveButton 
        client = {props.client}
        clientId = {props.clientId}
         />
    </div>
}