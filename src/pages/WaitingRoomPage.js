// import '../login/waitingRoom.css'
import { useParams } from 'react-router-dom'
import { WaitingRoom } from '../WaitingRoom/WaitingRoom';
import { LeftGameModal } from '../Modals/LeftGameModal';
import LeaveButton from '../Buttons/LeaveButton';
import leaveGame from '../login/loginFunctions'



export const WaitingRoomPage = (props) => {
    const clients = props.game.clients;
    // let { gameId } = useParams();
    return <div>
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