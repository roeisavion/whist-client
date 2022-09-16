import '../login/waitingRoom.css'
import {useParams} from 'react-router-dom'


export const WaitingRoomPage = (props) => {
    const clients = props.game.clients;
    let { gameId } = useParams();
    const createData = () =>{
        return Object.values(clients).map(c => {
            const {playerNum,nickname} = c
            return <tr>
                <td>{playerNum + ":"}</td>
                <td>{nickname}</td>
            </tr>
        })
    }
    
    const data = createData();
    return <div className="waitingRoom">
        <h3>players in room :</h3>
        <table>
            <tbody>
                {data}
            </tbody>
        </table>
        <p>GameID: {props.game.id}</p>
    </div>
}