import { WaitingRoom } from '../WaitingRoom/WaitingRoom';
import { LeftGameModal } from '../Modals/LeftGameModal';
import LeaveButton from '../Buttons/LeaveButton';



export const WaitingRoomPage = (props) => {
    // const clients = props.game.clients;
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